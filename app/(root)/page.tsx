import { Tags } from "lucide-react";
import Link from "next/link";

import { auth } from "@/auth";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const questions = [
  {
    _id: 1,
    title:
      "What is the best way to learn React.js?",
    description:
      "I'm looking for a comprehensive guide to learning Next.js.",
    tags: [
      {
        _id: 1,
        name: "Next.js",
      },
    ],
    author: {
      _id: 1,
      name: "John Doe",
      picture: "https://github.com/john-doe.png",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: 2,
    title:
      "What is the best way to learn Next.js?",
    description:
      "I'm looking for a comprehensive guide to learning Next.js.",
    tags: [
      {
        _id: 1,
        name: "Next.js",
      },
    ],
    author: {
      _id: 1,
      name: "John Doe",
      picture: "https://github.com/john-doe.png",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
];

interface SearchParams {
  searchParams: Promise<{
    [key: string]: string;
  }>;
}

export default async function Home({
  searchParams,
}: SearchParams) {
  /*   const session = await auth();
  console.log("session", session); */

  const { query = "" } = await searchParams;

  const filteredQuestions = questions.filter(
    (question) => {
      return question.title
        .toLowerCase()
        .includes(query.toLowerCase());
    }
  );

  // co

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">
          All Questions
        </h1>
        <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
          <Link href={ROUTES.ASK_QUESTION}>
            Ask a Questions
          </Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
      </section>
      HomeFilter
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <h1 key={question._id}>
            {question.title}
          </h1>
        ))}
      </div>
      {/* <h1 className="h1-bold">
        Welcome to Nextjs 15{" "}
      </h1>
      <h1 className="h1-bold font-space-grotesk">
        Welcome to Nextjs 15{" "}
      </h1>
      <form
        className="px-10 pt-[100px]"
        action={async () => {
          "use server";
          await signOut({
            redirectTo: ROUTES.SIGN_IN,
          });
        }}
      >
        <Button
          type="submit"
          className="bg-red-300"
        >
          Log out
        </Button>
      </form> */}
    </>
  );
}
