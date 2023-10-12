const express = require("express");
const Pool = require('pg').Pool;
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;
const https = require('https');
const path = require('path');
const date = require('date-and-time')

// Creating object of current date and time 
// by using Date() 
var now = new Date();

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


const g2 = ["seconds", "minutes", "hours", "days", "weeks", "months", "year"];

app.get('/device/:tagID', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/device.html'));
});
app.get('/table', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/tables/table.html'));
});
app.get('/overview', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/overview.html'));
});
app.use(express.static(__dirname + "/public"));
app.use('/device/:tagID', express.static(__dirname + "/public"));

app.post('/batinfo1/:tagId', (req, res) => {
  try {
    var id = req.params.tagId

    sample = 1
    sub = 1
    num_sample = 1
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


    sq = "select * from public.battery where id = " + id + " order by date + time desc limit  " + num_sample;
    pool.query(
      sq,
      (err, res2) => {

        res.json(res2);
      })
  } catch (error) {
    console.error(error)
  }
})
app.post('/batsql', (req, res) => {
  try {
    var id = req.params.tagId

    sample = 1
    sub = 1
    num_sample = 1
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


    sq = req.body.sql;
    pool.query(
      sq,
      (err, res2) => {

        res.json(res2);
      })
  } catch (error) {
    console.error(error)
  }
})

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




app.post('/addRawData', (req, res) => {
  // users.push(req.body)
  let json = req.body

  console.log(json)

  // if (isNaN(Number(req.body.id))) {
  //   return res.status(400).json({ err: "Numbers only, please!" });
  // }

  var d = {
    //dnum:  '0   1 2 3  4  5  6 7 8 9  10 11  121314 15  16171819202122  23 2425 2627 28  29 30  31 32  33 34  35 36  37383940 41 42 43 444546  47  48  0   1 2 3  4  5  6 ',
    rawData: '221_3_0_42_26_26_0_0_3_71_23_112_0_0_46_217_0_0_0_0_0_0_148_14_1_20_5_11_169_11_182_11_177_11_178_11_180_0_0_0_23_112_3_71_0_0_248_144_119_221_4_0_40_13_25_13_27_13_29_13_29_13_30_13_28_13_29_13_28_13_29_13_29_13_22_12_8_13_24_13_24_13_26_13_27_13_26_13_30_13_25_13_29_252_201_119_',
    info: 'Manufacturer: INCORPORATED Model: A7670E-FASE Revision: A7670M7_V1.11.1 IMEI: 862205059261570 +GCAP: +CGSM,+FCLASS,+DS',
    name: 'A7670E-FASE'
  }
  d = json;
  var data1 = {
    id: 0,
    date: "'2023/05/18'",
    time: "'13:50:10'",
    voltage: 50.49,
    current: 7.47,
    cell1: 0,
    cell2: 0,
    cell3: 0,
    cell4: 0,
    cell5: 0,
    cell6: 0,
    cell7: 0,
    cell8: 0,
    cell9: 0,
    cell10: 0,
    cell11: 0,
    cell12: 0,
    cell13: 0,
    cell14: 0,
    cell15: 0,
    cell16: 0,
    cell17: 0,
    cell18: 0,
    cell19: 0,
    cell20: 0,
    avg_cell: 0,
    max_cell: 0,
    min_cell: 0,
    soc: 67,
    remaincap: 27000,
    fcc: 40000,
    cycle: 0,
    temp1: 37.5,
    temp2: 37.5,
    temp3: 37.4,
    temp4: 37.1,
    temp5: 37.1,
    c_fet: "'ON'",
    d_fet: "'ON'",
    protectstatus: "null",
    balancestatus: 0
  }

  now = new Date();
  d.info = d.info.slice(d.info.indexOf('IMEI: '));
  data1.id = d.info.replace(/\D/g, '');

  data1.date = "'" + date.format(now, 'YYYY/MM/DD') + "'";
  data1.time = "'" + date.format(now, 'HH:mm:ss') + "'";
  console.log(data1.time);
  aaa = d.rawData.split('_');
  aaa.shift(); // start
  aaa.shift(); // command
  aaa.shift(); // err
  var len1 = parseInt(aaa.shift()); // 3

  data1.voltage = 0.01 * 256 * parseInt(aaa.shift());  // 4
  data1.voltage += 0.01 * parseInt(aaa.shift()); // 5
  data1.voltage = parseFloat(data1.voltage.toFixed(2));

  data1.current = 0.01 * 256 * parseInt(aaa.shift()); // 6
  data1.current += 0.01 * parseInt(aaa.shift()); // 7
  data1.current = parseFloat(data1.current.toFixed(2));

  data1.remaincap = 2560 * parseInt(aaa.shift());  // 8
  data1.remaincap += 10 * parseInt(aaa.shift());  // 9

  data1.fcc = 2560 * parseInt(aaa.shift());  //  10
  data1.fcc += 10 * parseInt(aaa.shift());  //  11

  data1.cycle = 256 * parseInt(aaa.shift());  // 12
  data1.cycle += parseInt(aaa.shift());  //  13

  aaa.shift(); // Production date 14
  aaa.shift(); // Production date 15

  data1.balancestatus = 256 * parseInt(aaa.shift()); // 16
  data1.balancestatus += parseInt(aaa.shift());  // 17
  data1.balancestatus = 256 * 256 * 256 * parseInt(aaa.shift()); // 18
  data1.balancestatus += 256 * 256 * parseInt(aaa.shift());  // 19

  data1.protectstatus = 256 * parseInt(aaa.shift());  // 20
  data1.protectstatus += parseInt(aaa.shift());  // 21

  aaa.shift(); // Software version 22

  data1.soc = parseInt(aaa.shift()); // 23

  switch (aaa.shift()) {
    case '00':
      data1.c_fet = "'OFF'";
      data1.d_fet = "'OFF'";
      break;
    case '01':
      data1.c_fet = "'ON'";
      data1.d_fet = "'OFF'";
      break;
    case '10':
      data1.c_fet = "'OFF'";
      data1.d_fet = "'ON'";
      break;
    case '11':
      data1.c_fet = "'ON'";
      data1.d_fet = "'ON'";
      break;
    default:
      data1.c_fet = "'OFF'";
      data1.d_fet = "'OFF'";
      break;
  }   //control status 24
  aaa.shift();   //Battery series number 25
  aaa.shift();   //NTC number 26 = 5

  data1.temp1 = 256 * parseInt(aaa.shift()); // 27
  data1.temp1 += parseInt(aaa.shift());  // 28
  data1.temp1 = (data1.temp1 - 2731) / 10;

  data1.temp2 = 256 * parseInt(aaa.shift()); // 29
  data1.temp2 += parseInt(aaa.shift());  // 30
  data1.temp2 = (data1.temp2 - 2731) / 10;

  data1.temp3 = 256 * parseInt(aaa.shift()); // 31
  data1.temp3 += parseInt(aaa.shift());  // 32
  data1.temp3 = (data1.temp3 - 2731) / 10;

  data1.temp4 = 256 * parseInt(aaa.shift()); // 33
  data1.temp4 += parseInt(aaa.shift());  // 34
  data1.temp4 = (data1.temp4 - 2731) / 10;

  data1.temp5 = 256 * parseInt(aaa.shift()); // 35
  data1.temp5 += parseInt(aaa.shift());  // 36
  data1.temp5 = (data1.temp5 - 2731) / 10;

  len1 -= 30;
  for (let index = 0; index < len1; index++) {
    aaa.shift(); // rm x 12
  }

  aaa.shift(); // start
  aaa.shift(); // command
  aaa.shift(); // err
  var len2 = parseInt(aaa.shift()); // 3

  // 4
  for (let i = 1; i <= len2/2; i++) {
    data1['cell' + i] = 256 * parseInt(aaa.shift());
    data1['cell' + i] += parseInt(aaa.shift());
    data1['cell' + i] = parseFloat((data1['cell' + i] / 1000).toFixed(3));
  }



  data_all = ''
  all_key = ''
  Object.entries(data1).forEach(([key, value]) => {
    data_all += value + (key == 'balancestatus' ? '' : ',')
    all_key += key + (key == 'balancestatus' ? '' : ',')
  });

  console.log("INSERT INTO public.battery (" + all_key + ") " +
    " VALUES (" + data_all + ")")
  pool.query(
    "INSERT INTO public.battery (" + all_key + ") " +
    " VALUES (" + data_all + ")"
    , (err, res2) => {
      console.log(res2);
      res.send("600");
    })


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

    json.date = "'" + date.format(now, 'YYYY/MM/DD') + "'";
    json.time = "'" + date.format(now, 'HH:mm:ss') + "'";

    all_key = ''
    Object.entries(json).forEach(([key, value]) => {
      data_all += value + (key == 'balancestatus' ? '' : ',')
      all_key += key + (key == 'balancestatus' ? '' : ',')
    });

    console.log("INSERT INTO public.battery (" + all_key + ") " +
      " VALUES (" + data_all + ")")
    pool.query(
      "INSERT INTO public.battery (" + all_key + ") " +
      " VALUES (" + data_all + ")"
      , (err, res2) => {
        res.json(600);
      })

  } catch (error) {

  }
})
app.listen(port, () => {
  console.log(`Starting node.js at port ${port}`);
});

