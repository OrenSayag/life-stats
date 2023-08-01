import React from "react";
import { UserAvatarParams } from "../../types/component-params/app.type";
import Image from "next/image";

const UserAvatar: React.FC<UserAvatarParams> = ({ profilePicUrl }) => {
  return (
    <div>
      <Image
        src={profilePicUrl}
        className={"rounded-full"}
        alt={"user-avatar"}
        height={50}
        width={50}
      />
    </div>
  );
};

export default UserAvatar;
