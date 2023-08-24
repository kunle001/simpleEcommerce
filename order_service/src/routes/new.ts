import express from 'express';

const router = express.Router();

router.post('/create-order', async (req, res) => {
  const { product, price, amount } = req.body;
  const msg = { product, price, amount }



  res.send({
    message: 'order created successfully!',
    product,
    price,
    amount
  })
});

export { router as createOrder }