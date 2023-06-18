import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import {
  faSquarePlus,
  faTrashCan,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import { Button } from "@/components/ui/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import DeleteConfirmation from "@/components/dialog/DeleteConfirmation";
import { AlertDialog } from "@/components/ui/AlertDialog";
import { Dialog } from "@/components/ui/Dialog";
import ShareDialog from "@/components/dialog/ShareDialog";
import CreateDialog from "@/components/dialog/CreateDialog";
import EditDialog from "@/components/dialog/EditDialog";
import CreateGroupDialog from "./dialog/CreateGroupDialog";
import CreateWidgetDialog from "./dialog/CreateWidgetDialog";

interface IDashboardOptionsProps {
  onCardAdded: () => Promise<void>;
  onDashboardUpdate: ({
    title,
    description,
  }: {
    title: string;
    description?: string;
  }) => Promise<any>;
  title: string;
  description?: string;
  dashboard: string;
}

function DashboardOptions(props: IDashboardOptionsProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [isCreateWidgetDialogOpen, setIsCreateWidgetDialogOpen] =
    React.useState(false);
  const [isCreateGroupDialogOpen, setIsCreateGroupDialogOpen] =
    React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = React.useState(false);

  function onDialogClose() {
    setIsCreateDialogOpen(false);
    setIsCreateWidgetDialogOpen(false);
    setIsCreateGroupDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsDeleteDialogOpen(false);
    setIsShareDialogOpen(false);
    void props.onCardAdded();
  }

  function onDashboardUpdate({
    title,
    description,
  }: {
    title: string;
    description?: string;
  }) {
    setIsCreateDialogOpen(false);
    setIsCreateWidgetDialogOpen(false);
    setIsCreateGroupDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsDeleteDialogOpen(false);
    setIsShareDialogOpen(false);
    void props.onDashboardUpdate({ title, description });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" asChild>
                  <FontAwesomeIcon icon={faEllipsis} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Dashboard options</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Dashboard Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setIsCreateDialogOpen(true)}>
              <FontAwesomeIcon icon={faSquarePlus} className="mr-4" />
              <span>Create new card</span>
              <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsCreateWidgetDialogOpen(true)}>
              <FontAwesomeIcon icon={faSquarePlus} className="mr-4" />
              <span>Create new widget</span>
              <DropdownMenuShortcut>⇧⌘W</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsCreateGroupDialogOpen(true)}>
              <FontAwesomeIcon icon={faSquarePlus} className="mr-4" />
              <span>Create new group</span>
              <DropdownMenuShortcut>⇧⌘G</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
              <FontAwesomeIcon icon={faPenToSquare} className="mr-4" />
              <span>Edit dashboard</span>
              <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsShareDialogOpen(true)}>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="mr-4"
              />
              <span>Share dashboard</span>
              <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <FontAwesomeIcon icon={faTrashCan} className="mr-4 " />
            <span>Delete dashboard</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <CreateDialog onClose={onDialogClose} dashboard={props.dashboard} />
      </Dialog>
      <Dialog
        open={isCreateWidgetDialogOpen}
        onOpenChange={setIsCreateWidgetDialogOpen}
      >
        <CreateWidgetDialog
          onClose={onDialogClose}
          dashboard={props.dashboard}
        />
      </Dialog>
      <Dialog
        open={isCreateGroupDialogOpen}
        onOpenChange={setIsCreateGroupDialogOpen}
      >
        <CreateGroupDialog
          onClose={onDialogClose}
          dashboard={props.dashboard}
        />
      </Dialog>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <EditDialog
          onUpdate={onDashboardUpdate}
          title={props.title}
          description={props.description}
        />
      </Dialog>
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <ShareDialog />
      </Dialog>
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <DeleteConfirmation />
      </AlertDialog>
    </>
  );
}

export default DashboardOptions;
