import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import icons from "@/utils/userIcons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

type Card = {
  name: string;
  iconColor: string;
  backgroundColor: string;
  link: string;
  description: string | null;
  icon: string;
};

interface ICardProps {
  card: Card;
}

function Card(props: ICardProps) {
  return (
    <div className="row-span-1 p-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={props.card.link}
              className="relative flex flex-col items-center justify-center p-2"
            >
              <div
                className="m-4 flex aspect-square w-1/2 items-center justify-center rounded-lg border border-black/10 shadow"
                style={{ backgroundColor: props.card.backgroundColor }}
              >
                <FontAwesomeIcon
                  icon={icons.get(props.card.icon) ?? faTriangleExclamation}
                  size="2x"
                  style={{ color: props.card.iconColor }}
                />
              </div>
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
