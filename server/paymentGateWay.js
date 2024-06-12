const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(cors());
const stripe = require("stripe")(
  "sk_test_51PQTFgKQW5VsZdS1pER3x0EYQXMqsLOdaNWWvyinc12j3RAuyjtkKYz1A9oalIGU0S5k7L3Sg4MhrH4yQ7kmBYpr006KpezjQd"
);

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
