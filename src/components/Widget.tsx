import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

type Widget = {
  name: string;
  description: string;
  url: string;
  size: "small" | "medium" | "large";
};

function calcSize(size: Widget["size"]) {
  switch (size) {
    case "small":
      return "col-span-2 row-span-1";
    case "medium":
      return "col-span-2 row-span-2";
    case "large":
      return "col-span-4 row-span-2";
  }
}

interface IWidgetProps {
  widget: Widget;
}

function Widget(props: IWidgetProps) {
  return (
    <div className={`flex flex-col p-4 ${calcSize(props.widget.size) ?? ""}`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="mb-2 flex w-full flex-grow items-center justify-center overflow-clip rounded-lg border border-black/10 shadow">
              <iframe
                width="100%"
                height="100%"
                src={props.widget.url}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{props.widget.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <h1 className="text-center text-lg">{props.widget.name}</h1>
    </div>
  );
}

export default Widget;
