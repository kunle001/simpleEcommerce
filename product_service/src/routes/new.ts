import express from 'express';


const router = express.Router();

router.post('/create-product', async (req, res) => {
  const { product, price, amount } = req.body
  const msg = {
    product, price, amount
  }

  // await consumeData();

  // (await achannel()).sendToQueue(
  //   'order_created',
  //   Buffer.from(
  //     JSON.stringify({
  //       msg
  //     })
  //   ))

  res.send({
    message: 'product created successfully!',
    product, price, amount
  })
});