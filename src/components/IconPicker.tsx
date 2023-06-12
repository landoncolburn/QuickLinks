import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import icons from "@/utils/userIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

interface IIconPickerInputProps {
  placeholder: string;
  changeIcon: (icon: string) => void;
  value: string;
}

function IconPickerInput(props: IIconPickerInputProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [currentIcon, setCurrentIcon] = React.useState<string>("");

  const faIcon = React.useMemo(() => icons.get(currentIcon), [currentIcon]);
  const fallbackIcon = icons.get(props.placeholder) ?? faTriangleExclamation;

  function changeIcon(icon: string) {
    props.changeIcon(icon);
    setCurrentIcon(icon);
    setIsOpen(false);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="flex h-16 w-full items-center rounded-md border p-4">
          <FontAwesomeIcon
            icon={faIcon ?? fallbackIcon}
            className="flex-grow"
          />
          <FontAwesomeIcon
            icon={faChevronDown}
            size="sm"
            className="text-black/50"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="grid w-max grid-cols-6 justify-center gap-2 overflow-scroll">
        {Array.from(icons.entries()).map(([name, icon]) => (
          <button
            key={name}
            type="button"
            className="h-16 w-16"
            onClick={() => changeIcon(name)}
          >
            <FontAwesomeIcon icon={icon} />
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export default IconPickerInput;
