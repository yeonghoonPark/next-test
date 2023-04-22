"use client";

import { signIn, signOut } from "next-auth/react";

export default function SignBtn({ session }) {
  if (session) {
    return (
      <button type='text' onClick={signOut}>
        SignOut
      </button>
    );
  } else {
    return (
      <button type='text' onClick={signIn}>
        SignIn
      </button>
    );
  }
}
