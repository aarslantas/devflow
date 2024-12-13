import ROUTES from "@/constants/routes";
import { Link } from "lucide-react";
import Image from "next/image";
import React from "react";

const hotQuestions = [
  {
    _id: "1",
    title:
      "How to create a custom hook in React ?",
  },
  {
    _id: "2",
    title: "How to use react query ?",
  },
  {
    _id: "3",
    title: "How to use Redux ?",
  },
  {
    _id: "4",
    title: "How to use React Router ?",
  },
  {
    _id: "5",
    title: "How to use React Context ?",
  },
];

const RightSidebar = () => {
  return (
    <section>
      <div className="pt-36 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden">
        <h3 className="h3-bold text-dark200_light900 ">
          Top Questions
        </h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map(({ _id, title }) => (
            <Link
              key={_id}
              href={ROUTES.PROFILE(_id)}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {title}
              </p>
              <Image
                src="/icons/chevron-right.svg"
                alt="Chevron"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
