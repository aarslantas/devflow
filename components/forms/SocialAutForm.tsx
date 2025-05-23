"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import React from "react";

import ROUTES from "@/constants/routes";
import { toast } from "@/hooks/use-toast";

import { Button } from "../ui/button";

const SocialAutForm = () => {
  const buttonClass =
    "background-dark400_light900 text-dark200_light800 body-medium min-h-12 flex-1 rounded-2 px-4 py-3.5";

  const handleSingIn = async (
    provider: "github" | "google"
  ) => {
    try {
      await signIn(provider, {
        redirectTo: ROUTES.HOME,
        redirect: false,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Sign-in Failed",
        description:
          error instanceof Error
            ? error.message
            : "An error occeured during sign-in",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-10 flex flex-wrap gap-4 ">
      <Button
        className={buttonClass}
        onClick={() => handleSingIn("github")}
      >
        <Image
          src="icons/github.svg"
          alt="Github Logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Log in With Github</span>
      </Button>

      <Button
        className={buttonClass}
        onClick={() => handleSingIn("google")}
      >
        <Image
          src="icons/google.svg"
          alt="Google Logo"
          width={20}
          height={20}
          className=" mr-2.5 object-contain"
        />
        <span>Log in With Google</span>
      </Button>
    </div>
  );
};

export default SocialAutForm;
