import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const SocialAutForm = () => {
  const buttonClass =
    "py-3.5 background-dark400-light900 min-h-12 flex-1 rounded-2 px-4 body-medium text-dark200_light800";

  return (
    <div className="gap-2.5 mt-10 flex-wrap ">
      <Button className={buttonClass}>
        <Image
          src="icons/github.svg"
          alt="Github Logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Log in With Github</span>
      </Button>
      <Button className={buttonClass}>
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
