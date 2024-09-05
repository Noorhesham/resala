"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <Button
      onClick={async() => {
        const res=await signOut();
        console.log(res)
      }}
      variant="destructive"
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
