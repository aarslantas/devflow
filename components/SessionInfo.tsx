import React from "react";

import { auth, signOut } from "@/auth";
import ROUTES from "@/constants/routes";

const SessionInfo = async () => {
  const session = await auth();
  console.log("session", session);
  return (
    <div>
      <h2>Session Information</h2>
      {/* <p>User: {session?.user.email}</p> */}
      <p>Session Start: </p>
      <form
        className="px-10 pt-[100px]"
        action={async () => {
          "use server";
          await signOut({
            redirectTo: ROUTES.SIGN_IN,
          });
        }}
      >
        <button
          type="submit"
          className="bg-red-300"
        >
          Log out
        </button>
      </form>
    </div>
  );
};

export default SessionInfo;
