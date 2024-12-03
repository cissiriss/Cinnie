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

const port = 3000;

app.listen(port, () => {
  console.log("Webbtjänsten kan nu ta emot anrop.");
});
