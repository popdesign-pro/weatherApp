// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
const { code } = require("statuses");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// testing code only for tranning
app.get("/", (req, res, next) => {
  console.log("Time Is: ", new Date());
  next();
});

const weatherData = [];

app.post("/addData", addData);
function addData(req, res) {
  console.log(req.body);
  newEntry = {
    temp: req.body.temp,
    date: req.body.date,
    feel: req.body.feel,
  };

  weatherData.push(newEntry);
  res.send(weatherData)
  console.log(weatherData);
}

//? from store
app.get('/update',(req,res)=>{
  res.send(weatherData)
})