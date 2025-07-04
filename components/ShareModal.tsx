import { useSelf } from "@liveblocks/react/suspense";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import UserTypeSelector from "./UserTypeSelector";
import Collaborator from "./Collaborator";
import { updateDocumentAccess } from "@/lib/actions/room.actions";

const ShareModal = ({
  collaborators,
  creatorId,
  currentUserType,
  roomId,
}: ShareDocumentDialogProps) => {
  const user = useSelf();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<UserType>("viewer");
  const shareDocumentHandler = async () => {
    setLoading(true);
    await updateDocumentAccess({
      roomId,
      email,
      userType: userType as UserType,
      updatedBy: user.info,
    });
    setLoading(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          className="bg-gradient-to-t from-blue-500 to-blue-400 flex h-9 gap-1 px-4"
          disabled={currentUserType !== "editor"}
        >
          <Image
            src="/assets/icons/share.svg"
            alt="share"
            width={20}
            height={20}
            className="min-w-4 md:size-5"
          />
          <p className="mr-1 hidden sm:block ">Share</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[400px] rounded-xl border-none bg-blue-950 bg-cover px-5 py-7 shadow-xl sm:min-w-[500px] !important">
        <DialogHeader>
          <DialogTitle>Manage who can view this project </DialogTitle>
          <DialogDescription>
            Select the users which can view and edit the document
          </DialogDescription>
        </DialogHeader>

        <Label htmlFor="email" className="mt-6 text-blue-200">
          Email Address
        </Label>
        <div className="flex items-center gap-3 ">
          <div className="flex flex-1 rounder-md bg-[#27344D] ">
            <Input
              id="email"
              placeholder="enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 flex-1 border-none bg-[#27344D] focus-visible:ring-0 focus-visible:ring-offset-0 !important"
            />
            <UserTypeSelector
              userType={userType}
              setUserType={setUserType}
              onClickHandler={() => {}}
            />
          </div>
          <Button
            type="submit"
            onClick={shareDocumentHandler}
            className="bg-gradient-to-t from-blue-500 to-blue-400 flex h-full gap-1 px-5"
            disabled={loading}
          >
            {loading ? "Sending" : "Invite"}
          </Button>
        </div>

        {/* Adding collaborators */}
        <div className="my-2 space-y-2">
          <ul className="flex flex-col">
            {collaborators.map((collaborator) => (
              <Collaborator
                collaborator={collaborator}
                creatorId={creatorId}
                key={collaborator.id}
                email={collaborator.email}
                roomId={roomId}
                user={user.info}
              />
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
