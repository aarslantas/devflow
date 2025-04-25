"use client";

import AuthForm from "@/components/forms/AuthForm";
import { signUpWithCredentials } from "@/lib/actions/auth.action";
import { SignInSchema } from "@/lib/validation";

const Signup = () => {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={SignInSchema} // değişecek
      defaultValues={{
        email: "",
        password: "",
        name: "",
        username: "",
      }}
      onSubmit={signUpWithCredentials}
    />
  );
};

export default Signup;
