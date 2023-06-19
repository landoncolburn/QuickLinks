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
import DashboardContext from "@/context/DashboardContext";
import { Dialog } from "./ui/Dialog";
import EditCardDialog from "./dialog/EditCardDialog";
import { api } from "@/utils/api";

type Card = {
  id: string;
  name: string;
  iconColor: string;
  backgroundColor: string;
  link: string;
  description: string | null;
  icon: string;
};

interface ICardProps {
  card: Card;
  onUpdate?: () => Promise<void>;
}

function Card(props: ICardProps) {
  const { editMode } = React.useContext(DashboardContext);
  const updateCard = api.cards.updateCard.useMutation();

  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

  async function handleCardEdit(card: Card) {
    await updateCard.mutateAsync({
      ...card,
      id: props.card.id,
      description: card.description || undefined,
    });
    setIsEditDialogOpen(false);
    props.onUpdate && (await props.onUpdate());
  }

  return (
    <div className="col-span-1 row-span-1 p-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={props.card.link}
              className="relative flex w-full flex-col items-center justify-center p-2"
              onClick={
                editMode
                  ? (e) => {
                      e.preventDefault();
                      setIsEditDialogOpen(true);
                    }
                  : undefined
              }
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
              <h1 className="w-full text-center text-lg">
                {editMode ? "edit" : props.card.name}
              </h1>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{props.card.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <EditCardDialog
          card={props.card}
          onClose={async (card) =>
            await handleCardEdit({
              ...card,
              description: card.description || null,
            })
          }
        />
      </Dialog>
    </div>
  );
}

export default Card;
