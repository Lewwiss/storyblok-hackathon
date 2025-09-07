import { Worker, type Job } from "bullmq";
import IORedis from "ioredis";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

new Worker("queue", async (job: Job) => {
    
    // do the code here



  },
  {
    connection,
    concurrency: 1,
  },
);
