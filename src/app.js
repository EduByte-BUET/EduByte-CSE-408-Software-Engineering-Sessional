const express = require("express");
const path = require("path");
const app = express();
const request = require('request');
app.use(express.static("public"));
app.use(express.json());

app.get("/test", (_req, res) => {
  res.status(200).send("Hello world");
});

app.get("/cse408", (_req, res) => {
  res.status(200).send("Are you ready for Deploy your own project on aws ecr?");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post('/showpost', (req, res) => {
  console.log('check log')
  const url = `https://secure.shippingapis.com/ShippingAPI.dll?API=ZipCodeLookup&XML=<ZipCodeLookupRequest USERID="661PARAP3185">
              <Address>
              <Address1>${req.body.address1}</Address1>
              <Address2>${req.body.address2}</Address2>
              <City>${req.body.city}</City>
              <State>${req.body.state}</State>
              </Address>
              </ZipCodeLookupRequest>`;
  console.log(url)
  res.status(200).send(url)
})

module.exports = app;
