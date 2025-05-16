"use client";

import AuthForm from "@/components/forms/AuthForm";
import { signUpWithCredentials } from "@/lib/actions/auth.action";
import { SignUpSchema } from "@/lib/validation";

const Signup = () => {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={SignUpSchema} // değişecek
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
