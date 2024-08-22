import React from "react";
import { SquarePen, ScanText, Link2 } from "lucide-react";
import RecipeForm from "./RecipeForm";
import ImageUploadORC from "./ImageUploadORC";
import URLParser from "./URLParser";

type Props = {};

function MethodSelector({}: Props) {
  const [selected, setSelected] = React.useState<string | null>();

  function Selector() {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Where would you like to start?</h1>
        <button
          onClick={() => setSelected("blank")}
          className="btn btn-block bg-primary text-primary-content grid h-40 place-content-center rounded"
        >
          <span className="flex flex-col items-center justify-center">
            <SquarePen />
            From Scratch?
          </span>
        </button>
        <button
          disabled
          onClick={() => setSelected("image")}
          className="btn btn-block bg-accent text-accent-content grid h-40 place-content-center rounded"
        >
          <span className="flex flex-col items-center justify-center">
            <ScanText />
            From an Image
          </span>
        </button>
        <button
          disabled
          onClick={() => setSelected("url")}
          className="btn btn-block bg-secondary text-secondary-content grid h-40 place-content-center rounded"
        >
          <span className="flex flex-col items-center justify-center">
            <Link2 />
            From a URL
          </span>
        </button>
      </div>
    );
  }

  function Method() {
    switch (selected) {
      case "blank":
        return <RecipeForm onReturnCallback={() => setSelected(null)} />;
      case "image":
        return <ImageUploadORC onReturnCallback={() => setSelected(null)} />;
      case "url":
        return <URLParser onReturnCallback={() => setSelected(null)} />;
      default:
        return <Selector />;
    }
  }

  return <Method />;
}

export default MethodSelector;
