import { NextResponse } from "next/server";
import { Queue } from "bullmq";
import * as fs from "fs";
import IORedis from "ioredis";

const connection = new IORedis({
  host: String(process.env.REDIS_HOST),
  port: Number(process.env.REDIS_PORT),
});

const queue = new Queue("queue", { connection });

export const POST = async (
  request: Request,
  { params }: { params: Promise<{ adapter: string }> }
) => {
  const { adapter } = await params;

  if (!fs.existsSync(`adapters/${adapter}.ts`)) {
    return NextResponse.json({ status: "failed" }, { status: 404 });
  }

  const { space_id, story_id } = await request.json();

  if (String(space_id) !== String(process.env.STORYBLOK_SPACE_ID)) {
    return NextResponse.json({ status: "failed" }, { status: 400 });
  }

  await queue.add(story_id, {
    story_id,
    adapter,
  });

  return NextResponse.json({ status: "success" }, { status: 200 });
};
