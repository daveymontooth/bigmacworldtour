const express = require("express");
const axios = require("axios");
const csv = require("csvtojson");

const app = express();
const port = process.env.PORT || 5000;

app.get("/api/", (req, res) => {
    res.send("Hello");
});

app.get("/api/ip/:ip", async (req, res) => {
  const result = await axios.get(`https://ipvigilante.com/json/${req.params.ip}`);
  res.send({ data: result.data.data });
});

app.get("/api/data", async (req, res) => {

  /* Use let because I am intentionally going to mutate data */
  let data = [];

  try {
    const result = await axios.get("https://raw.githubusercontent.com/zelima/big-mac-index/master/data/big-mac-index.csv");
    csv({
        noheader: false,
        headers: ["country","date","localPrice","dollarEx","dollarPrice","dollarPPP","dollarValuation"]
    })
    .fromString(result.data)
    .subscribe((csvRow) => { 
        /* We only want the most relevant country data */
        /* If the country does not exist, then insert it */
        /* If the country exists, check if the ingested data is greater (more recent). If so, replace it. */
        data = data.filter(record => {
            const recordDate = new Date(record.date);
            const rowDate = new Date(csvRow.date);

            return record.country !== csvRow.country || recordDate > rowDate;
            
        });

        if(data.filter(country => country.country === csvRow.country).length === 0) {
            data.push(csvRow);
        }
      }, 
      (err) => { res.send({ error: err }) }, 
      () => {
        res.send({ data: data }) 
      }
    );
    
  }
  catch(ex) {
    res.send({ error: ex });
  }
  
});

app.listen(port, () => console.log(`Listening on port ${port}`));