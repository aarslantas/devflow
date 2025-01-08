import Image from "next/image";
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
  remove?: boolean;
  isButton?: boolean;
  onRemove?: () => void;
}

const TagCard = ({
  _id,
  name,
  questions,
  showCount,
  compact,
  remove,
  isButton,
  onRemove,
}: Props) => {
  const iconClass = getDevIconClassName(name);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const content = (
    <>
      <Badge className="background-light800_dark300 text-light400_light500 flex flex-row gap-2 rounded-md border-none px-4 py-2 uppercase">
        <i className={`${iconClass} text-sm`} />{" "}
        <div className="flex-center ml-2">
          <span>{name}</span>
        </div>
        {remove && (
          <Image
            src="/icons/close.svg"
            alt="close icon"
            width={12}
            height={12}
            className="cursor-pointer object-contain invert-0 dark:invert"
            onClick={onRemove}
          />
        )}
      </Badge>
      {showCount && (
        <p className="small-medium text-dark500_light700">
          {questions}
        </p>
      )}
    </>
  );

  if (compact) {
    return isButton ? (
      <button
        onClick={handleClick}
        className="flex justify-between gap-2"
      >
        {content}
      </button>
    ) : (
      <Link
        href={ROUTES.TAGS(_id)}
        className="flex justify-between gap-2"
      >
        {content}
      </Link>
    );
  }
};

export default TagCard;
