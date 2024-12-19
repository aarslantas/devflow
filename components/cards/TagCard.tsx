import ROUTES from "@/constants/routes";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import { getDevIconClassName } from "@/lib/utils";

interface Props {
  _id: string;
  name: string;
  questions: number;
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
  return (
    <Link
      href={ROUTES.TAGS(_id)}
      className="flex justify-between  gap-2"
    >
      <Badge className="background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        <i className={`${iconClass} text-sm`}></i>
        <div className="flex-center space-x-2">
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