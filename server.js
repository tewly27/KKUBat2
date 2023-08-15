const express = require("express");
const Pool = require('pg').Pool;
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;
const https = require('https');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(cors({
  origin: '*'
}));






//////////////////
const pool = new Pool({
  host: 'local_pgdb',
  // host: 'localhost',
  database: 'admin',
  user: 'admin',
  password: 'k304298',
  port: 5432,
});
pool.connect();
//////////////////
app.use(express.static(__dirname + "/public"));
app.use('bat/:tagID', express.static(__dirname + "/public"));


const g2 = ["seconds", "minutes", "hours", "days", "weeks", "months", "year"];



app.post('/batinfo/:tagId', (req, res) => {
  try {
    var id = req.params.tagId

    sample = 1
    sub = 1
    num_sample = 60
    if (req.body.sub != null) {
      sub = req.body.sub
    }
    if (req.body.sample != null) {
      sample = req.body.sample
    }
    if (req.body.num_sample != null) {
      num_sample = req.body.num_sample
    }
    if (req.body.id != null) {
      id = req.body.id
    }
    var cells = " ";


    sq =
      "select avg(voltage) voltage,round(avg(current)::numeric,2)current " +
      ", date_trunc('" + g2[sample] + "', date+time) + round(extract(seconds FROM time) / " + sub + ")*" + sub + " * interval '1 second' datetime , " +
      "avg(temp1)temp1,avg(temp2)temp2,avg(temp3)temp3, " +
      "avg(temp4)temp4,round(avg(cycle)::numeric,2)cycle,round(avg(SOC)::numeric,2)SOC,round(avg(remaincap)::numeric)remaincap " +

      " from public.battery " +
      "where id = " + id +
      " group by datetime " +
      "order by datetime desc limit  " + num_sample;
    pool.query(
      sq,
      (err, res2) => {

        res.json(res2);
      })
  } catch (error) {
    console.error(error)
  }
})




app.post('/addData', (req, res) => {
  // users.push(req.body)
  let json = req.body
  console.log(json)

  // if (isNaN(Number(req.body.id))) {
  //   return res.status(400).json({ err: "Numbers only, please!" });
  // }
  try {
    var data = {
      id: 0,
      date: "'2023/05/18'",
      time: "'13:50:10'",
      voltage: 50.49,
      current: 7.47,
      cell1: 3.867,
      cell2: 3.887,
      cell3: 3.885,
      cell4: 3.886,
      cell5: 3.883,
      cell6: 3.887,
      cell7: 3.884,
      cell8: 3.885,
      cell9: 3.884,
      cell10: 3.883,
      cell11: 3.886,
      cell12: 3.885,
      cell13: 3.89,
      avg_cell: 3.884,
      max_cell: 3.89,
      min_cell: 3.867,
      soc: 67,
      remaincap: 27000,
      fcc: 40000,
      cycle: 0,
      temp1: 37.5,
      temp2: 37.5,
      temp3: 37.4,
      temp4: 37.1,
      c_fet: "'ON'",
      d_fet: "'ON'",
      protectstatus: "null",
      balancestatus: 0
    }

    data_all = ''
    all_key = ''
    Object.entries(json).forEach(([key, value]) => {
      data_all += value + (key == 'balancestatus' ? '' : ',')
      all_key += key + (key == 'balancestatus' ? '' : ',')
    });


    pool.query(
      "INSERT INTO public.battery (" + all_key + ") " +
      " VALUES (" + data_all + ")"
      , (err, res2) => {
        console.log(err)
      })

  } catch (error) {

  }
})


app.listen(port, () => {
  console.log(`Starting node.js at port ${port}`);
});

