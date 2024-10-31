//Valeria helped me with the code, so I could try to understand it, but my key said it was invalid, or I was doing something wrong

const express = require("express");
const app = express();
const https = require("https");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

const key = process.env.KEY;
const city = "";


// https get
app.get('/', (req, res) => {
    const city = req.query.city || 'London'; // Default city if none provided
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  
    https.get(url, (apiRes) => {
      let data = '';
  
      apiRes.on('data', (chunk) => {
        data += chunk;
      });
  
      apiRes.on('end', () => {
        const weatherData = JSON.parse(data);
  
        if (apiRes.statusCode === 200) {
          const temp = weatherData.main.temp;
          const description = weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
  
          res.send(`
            <h1>Clima en ${city}</h1>
            <p>Temperatura: ${temp}°C</p>
            <p>Descripción: ${description}</p>
            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
            <br><a href="/">Volver al inicio</a>
          `);
        } else {
          // Muestra el mensaje de error de la API en la respuesta
          res.send(`
            <h1>Error</h1>
            <p>${weatherData.message}</p>   
          `);
        }
      });
    }).on('error', (e) => {
      res.send(`
        <h1>Error</h1>
        <p>Hubo un problema al conectarse al servicio de clima. Intenta de nuevo más tarde.</p>
        <br><a href="/">Volver al inicio</a>
      `);
    });
  });

app.listen(3000, () => {
    console.log("Listening to port 3000");
});