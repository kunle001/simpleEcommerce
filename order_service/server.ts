import { app } from "./src/app";
import mongoose from "mongoose";

import dotenv from 'dotenv'
import amqp, { Channel, Connection } from 'amqplib'

dotenv.config({ path: './config.env' });

const port = process.env.PORT;



// const aconnection = async () => {
//   const conn = await amqp.connect('amqp://localhost:5672');

//   return conn
// };
// const achannel = async () => {
//   // @ts-ignore
//   const channel = await (await aconnection()).createChannel();

//   return channel
// }



mongoose.connect(process.env.DB!).then(async () => {
  console.log('Connected to mongoDB!');

});



// const consumeData = (async () => {
//   // @ts-ignore
//   (await achannel()).consume('product_created', async (data) => {
//     if (data?.content) {
//       try {
//         const { product } = JSON.parse(data.content.toString());
//         console.log(product);
//         (await achannel()).ack(data)
//       } catch (err) {
//         console.error('error from product created listener', err)
//       }
//     }
//   });
// })



app.listen(3005, () => {
  console.log('app is listening on port 3005')
});