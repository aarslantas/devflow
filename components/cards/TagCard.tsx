import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";
import { getDevIconClassName } from "@/lib/utils";

import { Badge } from "../ui/badge";

interface Props {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
}

const TagCard = ({
  _id,
  name,
  questions,
  showCount,
  compact,
}: Props) => {
  const iconClass = getDevIconClassName(name);
  console.log("iconClass", iconClass);
  return (
    <Link
      href={ROUTES.TAGS(_id)}
      className="flex justify-between gap-2"
    >
      <Badge className="background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        <i className={`${iconClass} text-sm`} />{" "}
        <div className="flex-center ml-2">
          <span>{name}</span>
        </div>
      </Badge>
      {showCount && (
        <p className="small-medium text-dark500_light700">
          {questions}
        </p>
      )}
    </Link>
  );
};

export default TagCard;
