const stripe = require("stripe")(
  "sk_test_51Pw80BJRahph5cPnxqckhr9uUnG5QoXzBXT1hEz5rleKx7gnB4EOwe213sZkITIN21TGXj3jrAy3hXv8TEHlj5By00QI33Fhd5"
);

const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });
    res.json(paymentIntent.client_secret);
  } catch (err) {
    console.error(error);
    console.log(req.body);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createPaymentIntent,
};
