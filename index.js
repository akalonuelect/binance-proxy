// index.js
import express from "express";
import fetch from "node-fetch";

const app = express();
const BINANCE_ROOT = "https://fapi.binance.com";

app.get("/fapi/v1/klines", async (req, res) => {
  try {
    // Build full Binance URL with any query parameters passed through
    const qp = new URLSearchParams(req.query);
    const url = `${BINANCE_ROOT}/fapi/v1/klines?${qp.toString()}`;

    const r = await fetch(url);
    const text = await r.text();

    res.set("Access-Control-Allow-Origin", "*");      // enable browser use
    res.set("Content-Type", "application/json");
    res.status(r.status).send(text);

  } catch (err) {
    res.status(500).send(JSON.stringify({ error: err.toString() }));
  }
});

app.get("/", (_req, res) => res.send("Proxy is running 👍"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Listening on port " + PORT));