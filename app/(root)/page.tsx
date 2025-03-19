import Link from "next/link";

import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { api } from "@/lib/api";
import { Question } from "@/types/global";

const questions: Question[] = [
  {
    _id: "1",
    title:
      "What is the best way to learn React.js?",
    tags: [
      {
        _id: "1",
        name: "react",
      },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title:
      "What is the best way to learn Next.js?",
    tags: [
      {
        _id: "2",
        name: "javascript",
      },
    ],
    author: {
      _id: "2",
      name: "John Doe",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
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

const test = async () => {
  try {
    return await api.users.getAll();
  } catch (err) {
    console.log(err);
  }
};

export default async function Home({
  searchParams,
}: SearchParams) {
  /*   const session = await auth();
  console.log("session", session); */

  const { query = "", filter = "" } =
    await searchParams;

  const result = await test();

  const filteredQuestions = questions.filter(
    (question) => {
      const matchesQuery = question.title
        .toLowerCase()
        .includes(query.toLowerCase());

      console.log("matchesQuery", matchesQuery);
      const matchesFilter = filter
        ? question.tags[0].name.toLowerCase() ===
          filter.toLowerCase()
        : true;

      console.log("matchesFilter", matchesFilter);
      return matchesQuery && matchesFilter;
    }
  );

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
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.map((question) => (
          <QuestionCard
            key={question._id}
            question={question}
          />
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
