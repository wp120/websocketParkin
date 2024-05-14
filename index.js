import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import toggleBarrierRouter from "./routes/toggleBarrierRouter.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const PORT = process.env.PORT || 6001;

app.use("/toggleBarrier",toggleBarrierRouter);

app.listen(PORT,()=>{
    console.log("Server is listening");
})

const wss = new WebSocketServer({ port: 8080 });

var slotId="-1";

const setSlotId = function(value) {
  slotId = value;
}

export {setSlotId};

wss.on('connection', function connection(ws) {
  console.log('Arduino WebSocket client connected');
  //can comment above line if not necessary

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send(slotId);
  console.log("id is sent");
  slotId="-1";
});
