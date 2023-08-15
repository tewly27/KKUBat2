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
  // host: 'local_pgdb',
  host: 'localhost',
  database: 'admin',
  user: 'admin',
  password: 'k304298',
  port: 5432,
});
pool.connect();
//////////////////
app.use(express.static(__dirname + "/public"));
app.use('/:tagID', express.static(__dirname + "/public"));


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
    // console.log(sq)
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

    pool.query(
      "INSERT INTO public.battery (id, date, time, voltage, current, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10, cell11, cell12, cell13, avg_cell, max_cell, min_cell, soc, remaincap, fcc, cycle, temp1, temp2, temp3, temp4, c_fet, d_fet, protectstatus, balancestatus) " +
      " VALUES (2,'2023/05/18','13:50:10',50.49,7.47,3.867,3.887,3.885,3.886,3.883,3.887,3.884,3.885,3.884,3.883,3.886,3.885,3.89,3.884,3.89,3.867,67,27000,40000,0,37.5,37.5,37.4,37.1,'ON','ON',null,0)"
      , (err, res2) => {
        console.log(err)

      })
  } catch (error) {

  }
})



app.listen(port, () => {
  console.log(`Starting node.js at port ${port}`);
});

