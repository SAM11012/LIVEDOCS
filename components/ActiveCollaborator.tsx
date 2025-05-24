import { useOthers } from "@liveblocks/react/suspense";
import Image from "next/image";
import React from "react";

const ActiveCollaborator = () => {
  const other = useOthers();
  const otherCollaborators = other.map((item) => item.info);
  return (
    <ul className=" items-center justify-end -space-x-3 overflow-hidden sm:flex;">
      {otherCollaborators.map(({ id, avatar, name, color }) => {
        return (
          <li key={id}>
            <Image
              src={avatar}
              alt="name"
              width={100}
              height={100}
              className="inline-block size-8 rounded-full ring ring-dark-100"
              style={{ border: `1px solid ${color}` }}
            />
            
          </li>
        );
      })}
     
    </ul>
  );
};

export default ActiveCollaborator;
