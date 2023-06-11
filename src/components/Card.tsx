import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import Link from "next/link";
import React from "react";

type Card = {
  name: string;
  color: string;
  link: string;
  description: string;
  group?: string;
};

interface ICardProps {
  card: Card;
}

function Card(props: ICardProps) {
  return (
    <div className="w-48 p-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={props.card.link}
              className="relative flex flex-col items-center justify-center p-2"
            >
              <div
                className="bg-[ m-4 aspect-square w-1/2 rounded-lg"
                style={{ backgroundColor: props.card.color }}
              ></div>
              <h1 className="text-center text-lg">{props.card.name}</h1>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{props.card.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default Card;
