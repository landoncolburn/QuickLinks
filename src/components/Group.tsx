import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import type { Card } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import icons from "@/utils/userIcons";
import Link from "next/link";

type IGroupProps = {
  name: string;
  cards: Card[];
};

function Group(props: IGroupProps) {
  return (
    <div className="col-span-2 row-span-2 flex flex-col p-4">
      <div className="mb-2 flex w-full flex-grow flex-col gap-4 rounded-lg border border-black/10 p-8 shadow">
        {props.cards.map((card) => (
          <Link
            key={card.id}
            href={card.link}
            className="flex h-8 flex-row items-center"
          >
            <div
              className="mr-4 flex aspect-square h-full items-center justify-center rounded-lg border border-black/10 shadow"
              style={{ backgroundColor: card.backgroundColor }}
            >
              <FontAwesomeIcon
                icon={icons.get(card.icon) ?? faTriangleExclamation}
                style={{ color: card.iconColor }}
              />
            </div>
            <h2>{card.name}</h2>
          </Link>
        ))}
      </div>
      <h1 className="text-center text-lg">{props.name}</h1>
    </div>
  );
}

export default Group;
