"use client";

import React, {
  useEffect,
  useState,
} from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import {
  useSearchParams,
  useRouter,
  usePathname,
} from "next/navigation";
import {
  formUrlQuery,
  removeKeysFromQuery,
} from "@/lib/url";

interface LocalSearchProps {
  route: string;
  imgSrc: string;
  placeholder: string;
  otherClasses: string;
}

const LocalSearch = ({
  route,
  imgSrc,
  placeholder,
  otherClasses,
}: LocalSearchProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] =
    useState(query);

  useEffect(() => {
    if (searchQuery) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "query",
        value: searchQuery,
      });

      router.push(newUrl);
    } else {
      if (pathname === route) {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });

        router.push(newUrl, { scroll: false });
      }
    }
  }, [searchQuery, router, route, searchParams]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      <Image
        src={imgSrc}
        width={24}
        height={24}
        alt="Search"
        className="cursor-pointer"
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
      />
    </div>
  );
};

export default LocalSearch;
