"use client";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
import React, {
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import Header from "./Header";
import { Editor } from "./editor/Editor";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import ActiveCollaborator from "./ActiveCollaborator";
import { Input } from "./ui/input";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { updateDocument } from "@/lib/actions/room.actions";

const CollaborativeRoom = ({ roomId, roomMetadata }: any) => {
  const currentUserType = "editor";
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const updateTitleHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key == "Enter") {
      setLoading(true);
      setEditing(false);
      try {
        if (documentTitle !== roomMetadata.title) {
          const updatedDoc = await updateDocument(roomId, documentTitle);
          if (updatedDoc) {
            setEditing(false);
            setLoading(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const mousedown = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setEditing(false);
        updateDocument(roomId,documentTitle)
      }
    };

    window.addEventListener("mousedown", mousedown);
    return () => window.removeEventListener("mousedown", mousedown);
  }, [roomId,documentTitle ]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        <Header>
          <div
            ref={containerRef}
            className="flex w-fit items-center justify-center gap-2"
          >
            {editing && !loading ? (
              <Input
                type="text"
                value={documentTitle}
                ref={inputRef}
                onChange={(e) => setDocumentTitle(e.target.value)}
                onKeyDown={updateTitleHandler}
                disabled={!editing}
                className="min-w-[78px] border-none bg-transparent px-0 text-left text-base font-semibold leading-[24px] focus-visible:ring-0 focus-visible:ring-offset-0 disabled:text-black sm:text-xl md:text-center !important"
              />
            ) : (
              <>
                <p className="line-clamp-1 border-dark-400 text-base font-semibold leading-[24px] sm:pl-0 sm:text-xl">
                  {" "}
                  {documentTitle}
                </p>
              </>
            )}
            {currentUserType === "editor" && !editing && (
              <Image
                alt="edit image"
                src="/assets/icons/edit.svg"
                width={24}
                height={24}
                onClick={() => setEditing(true)}
                className="pointer"
              />
            )}
            {loading && <p className="text-sm text-gray-400 ">Saving...</p>}
          </div>
          <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
            <ActiveCollaborator />
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </Header>
        <Editor />
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
