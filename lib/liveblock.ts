import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCK_SECRET_KEY as string,
  });