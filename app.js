// console.log ("Testing the app.js file");

/*Creating a new node app. To do that we are requiring an express module. */

const express = require ("express");
/*Requiring a https module. It is a native module inside node.js. Therefore it does not require external
installation process. */
const https = require ("https");

/**To catch the data from user input we need to install bodyparser module */
const bodyParser = require ("body-parser");

/* The variable name app is being used because it is the best practice 
to use app as a name to represent express modules or express app.*/
const app = express();

/**This is a must necessary code to declare to use the body-parser module to capture user input. */
app.use(bodyParser.urlencoded({extended: true}));

/*We will modify the code here so that if a browser gets in touch with us 
from port 3000 then it can get a response back. "/" The forward slash inside
the app.get is representing the homepage or home-root. */

app.get("/", function(request, response){ // app.get function starts

    response.sendFile(__dirname + "/index.html");

});// app.get function closes

/** We will catch user input via app.post method and here we are specifying the root route
 */

app.post ("/", function (req, response) { // app.post starts

        /*We have got this api link from the main website called open weather map and then tested in our 
    postman website since we have a account there.  */
    //const url ="https://api.openweathermap.org/data/2.5/weather?q=Dhaka&appid=d39ca0783259f864fca2063e406420e9&units=metric";
/* https://api.openweathermap.org/data/2.5/weather?q=Dhaka&appid=d39ca0783259f864fca2063e406420e9&units=metric
this link above could be broken down into several section and can be manipulated by getting the input from the user
to get  temperature from different cities. The process will be explained below. */

// cityname will come from index.html
const queryForCity = req.body.cityName ;
const apiKey = "d39ca0783259f864fca2063e406420e9";
const unitForWeather = "metric";

const url = " https://api.openweathermap.org/data/2.5/weather?q=" + queryForCity+ "&appid=" + apiKey+ "&units=" + unitForWeather;
    
/**Using the url const to get a https request from the open weather map server */
    https.get(url, function(response2){ // https.get function Starts
        /**If the status code comes as 200 in our command prompt then it means the request is successful */
console.log("Status Code of current request in terms of HTTPS response status codes is " + response2.statusCode);

/**Creating a callback function to receive and contain some data on a specific moment.*/

response2.on("data", function(data){ // response2.on function starts

    /**Turning the hexadecimal codes into a human readable javascript object. */
    const weatherData = JSON.parse(data);
/**This will display the hexadecimal codes into a human readable format */
    console.log(weatherData);

    /**Creating a const temp to analyse weatherData and store data specifically from the main object which 
     * will help us to find out the current temperature in Dhaka city.*/
    const temp = weatherData.main.temp;
    console.log("Current Temperature at " + queryForCity+ " City is "+ temp + " Degree Celsius.");

    /**Creating a const humidity to analyse weatherData and store data specifically from the main object which 
     * will help us to find out the current humidity in Dhaka city.*/
    const humidity = weatherData.main.humidity;
    console.log("Current Humidity at " + queryForCity+ " City is "+ humidity + " g/m3.");


/**Creating a const weatherDescription to analyse weatherData and store data specifically from the weather
 *  object which will help us to find out the current weather description in Dhaka city.*/
    const weatherDescription = weatherData.weather[0].description;
    console.log("Currently the Weather is "+ weatherDescription + " at " + queryForCity+ " City.");

    /** Creating a const called icon to automatically get the specific icon or image representing current 
     * weather condition at Dhaka City. The specific Icon or image will come from the website of 
     * openweathermap as they have vast collection of this images.*/
    const icon = weatherData.weather[0].icon;
    console.log("The specific icon ID for the current Weather in " + queryForCity+ " City is "+ icon);

/**Genrating the Icon image for the browser and the link has been copied from the website
 * https://openweathermap.org/img/wn/10d@2x.png. This is an example link given by open weather map company.
 * to get the actual weather icon in our current location we need to modify the link futher by dividing it 
 * in the following manner. 10d is just a icon code which has been given as a sample from the open weather map
 * company. Our current location icon code will be different and we will get exact code from the const icon.
 */
    const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

    /**It will only receive data in hexadecimal code */
    //console.log(data);

    /**To send multiple response to the browser we need to use .write method and at the end we will use the
     * final .send method. In this case we have used multiple response.write method and at the end we have finally 
     * written response.send     */
response.write("<h1>Current Temperature at " + queryForCity+ " City is "+ temp + " Degree Celsius.</h1>");
response.write("<h2>Current Humidity at " + queryForCity+ " City is "+ humidity + " g/m3.</h2>");
response.write("<p>Currently the Weather is "+ weatherDescription + " at " + queryForCity+ " City.</p>");
// sending the icon or image to the browser
response.write("<img src =" + imageURL + ">");
response.send();

}); // response2.on function closes

}); // https.get function closes
    
// Sending an <h1> tag HTML element to the browser as response.
//response.send("<h1> Server is up and running at port 3000.</h1>");


   // console.log(req.body.cityName);

    //console.log("Post request received");
    
}); // app.post closes

/*After this code we have literally just built our very first own server
this is the barebone of any express server.the callback function will give 
us feedback to verify whether the server is running or not. 
/*After this code we have literally just built our very first own server
this is the barebone of any express server.the callback function will give 
us feedback to verify whether the server is running or not. 
also process.env.port has been written when we upload our files to an external server
then this code will help our file to identify and use the available any random port 
on that particular external server company.*/
app.listen (process.env.PORT || 3000, function(){

    console.log ("Server has started running at port 3000. This is just a test message.");
});