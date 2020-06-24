const dotenv = require("dotenv");
dotenv.config();
var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
var AYLIENTextAPI = require("aylien_textapi");

// Set aylien API credentials
var textapi = new AYLIENTextAPI({
  application_id: process.env.APP_ID,
  application_key: process.env.APP_KEY,
});

// Start up an instance of app
const app = express();

// Configure express to use body-parser as middle-ware
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Configure cors for express to use it
const cors = require("cors");
app.use(cors());

app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  // res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

let projectData = {};

app.post("/sentiment", sendData);

function sendData(req, res) {
  let url = req.body.url;
  textapi.sentiment(
    {
      url: url,
      mode: "document",
    },
    function (error, response) {
      if (error === null) {
        projectData.text = req.body.text;
        projectData.subjectivity = req.body.subjectivity;
        projectData.polarity = req.body.polarity;
        projectData.polarity_confidence = req.body.polarity_confidence * 100;
        projectData.subjectivity_confidence =
          req.body.subjectivity_confidence * 100;
        res.send(projectData);
      } else {
        console.log(error);
      }
    }
  );
}
