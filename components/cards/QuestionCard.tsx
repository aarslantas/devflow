import React from "react";

import { getTimeStamp } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
}

const QuestionCard = ({
  question,
}: QuestionCardProps) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span>
            {getTimeStamp(question.createdAt)}
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {question.title}
            </h3>
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
