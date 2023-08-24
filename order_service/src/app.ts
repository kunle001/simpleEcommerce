import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import amqp, { Connection, Channel, Message } from 'amqplib';

const app = express();

let channel: Channel, connection: Connection;

async function connect() {
  const amqpServer = "amqp://localhost:5672"; // Corrected typo in protocol
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue('order_created'); // Corrected queue name
}

connect().then(() => {
  channel.consume('product_created', (data: Message | null) => {
    if (data) {
      const { product, price, amount } = JSON.parse(data.content.toString());
      console.log(product, price, amount);
      channel.ack(data);
    }
  });
});

app.use(cors());
app.use(bodyParser.json());

app.post('/create-order', (req, res) => {
  const { product, price, amount } = req.body;
  const msg = { product, price, amount };

  // Ensure that the channel is defined before sending the message
  if (channel) {
    channel.sendToQueue('order_created', Buffer.from(JSON.stringify(msg)));
    res.send({
      message: 'order created successfully!',
      product,
      price,
      amount
    });
  } else {
    res.status(500).send('Channel not ready');
  }
});

app.use('*', (req, res) => {
  res.status(404).send('Page not Found');
});

export { app };
