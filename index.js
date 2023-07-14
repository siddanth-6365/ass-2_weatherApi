const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function fetchdata(name) {
  let API_KEY = "4ea3a86ae13b44066e954f47a6355b88";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

app.post("/cities", async (req, res) => {
  try {
    const name = req.body.cities;
    let namearr = name.toString().split(",");
    const tempdata = await namearr.map((d) => fetchdata(d));

    res.json({
      "data ": tempdata,
    });
  } catch (err) {
    console.log("error ", err);
  }
});

app.listen(3000);
