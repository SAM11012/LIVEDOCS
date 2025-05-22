import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
import React from "react";
import Header from "./Header";
import { Editor } from "./editor/Editor";

const CollaborativeRoom = () => {
  return (
    <RoomProvider id="my-room">
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        <Header>
          <div className="flex w-fit items-center justify-center gap-2">
            <p className="line-clamp-1 border-dark-400 text-base font-semibold leading-[24px] sm:pl-0 sm:text-xl">
              Share
            </p>
          </div>
        </Header>
        <Editor />
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
