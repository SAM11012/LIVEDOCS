"use client";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { createDocument } from "@/lib/actions/room.actions";
import { useRouter } from "next/navigation"; // <--- CHANGE THIS LINE

const AddDocumentButton = ({ email, userId }: AddDocumentBtnProps) => {
  const router = useRouter();
  const DocumentHandler = async () => {
    try {
      const room = await createDocument({ email, userId });
      console.log(room);
      if (room) router.push(`/documents/${room.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      type="submit"
      onClick={DocumentHandler}
      className="bg-gradient-to-t from-blue-500 to-blue-400 cursor-pointer flex gap-1 shadow-md"
    >
      <Image src="/assets/icons/add.svg" alt="add" width={24} height={24} />
      Add your First Document
    </Button>
  );
};

export default AddDocumentButton;
