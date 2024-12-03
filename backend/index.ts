import cors from "cors";
import * as dotenv from "dotenv";
import { Client } from "pg";
import express from "express";

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI_LOCAL,
});

client.connect();

const app = express();

app.use(express.json());

app.use(cors());

// app.get("/", async (request, response) => {
//   const { rows } = await client.query(
//     "SELECT * FROM christmasmarket ORDER BY name"
//   );
//   response.send(rows);
// });

const port = 3000;

app.listen(port, () => {
  console.log("Webbtjänsten kan nu ta emot anrop.");
});
