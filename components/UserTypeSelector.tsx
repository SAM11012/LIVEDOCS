import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UserTypeSelector = ({
  setUserType,
  userType,
  onClickHandler,
}: UserTypeSelectorParams) => {
  const accessChangeHandler = (type: UserType) => {
    setUserType(type);
    onClickHandler && onClickHandler(type);
  };
  return (
    <Select
      value={userType}
      onValueChange={(type: UserType) => accessChangeHandler(type)}
    >
      <SelectTrigger className="w-fit border-none bg-transparent text-blue-100 !important">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent className="border-none bg-[#0B1527]">
        <SelectItem
          className="cursor-pointer bg-[#0B1527] text-blue-100 focus:bg-[#0F1C34]  focus:text-blue-100 !important"
          value="viewer"
        >
          can view
        </SelectItem>
        <SelectItem
          className="cursor-pointer bg-[#0B1527] text-blue-100 focus:bg-[#0F1C34]  focus:text-blue-100 !important"
          value="editor"
        >
          can edit
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UserTypeSelector;
