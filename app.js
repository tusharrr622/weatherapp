const express = require('express');
const https = require('https');
const app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apikey = "fb9fc4c79726acd6a6d57c3c6b0c4f83";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;

    https.get(url, function (response) {

        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherdata = JSON.parse(data);
            //  console.log(weatherdata);
            const temp = weatherdata.main.temp;
            const weatherdesc = weatherdata.weather[0].description;
            res.write("<p>The Weather description is " + weatherdesc + "</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degree Celcius.</h1>");
            res.send();
        });

    });
});

app.listen(3000, function () {
    console.log("Server running on 3000 port.");
});