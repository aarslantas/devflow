"use client";

import AuthForm from "@/components/forms/AuthForm";
import { SignInSchema } from "@/lib/validation";
import React from "react";

const Signup = () => {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={SignInSchema} // değişecek
      defaultValues={{ email: "", password: "", name: "", username: "" }}
      onSubmit={(data) => Promise.resolve({ success: true, data })}
    />
  );
};

export default Signup;
