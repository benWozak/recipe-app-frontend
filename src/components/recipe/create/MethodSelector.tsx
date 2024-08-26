import React from "react";
import { SquarePen, ScanText, Link2, Instagram } from "lucide-react";
import RecipeForm from "../form/RecipeForm";
import ImageUploadORC from "./ImageUploadORC";
import URLParser from "./URLParser";

type Props = {};

function MethodSelector({}: Props) {
  const [selected, setSelected] = React.useState<string | null>();

  function Selector() {
    return (
      <div className="container px-8 mb-8">
        <h1 className="text-2xl text-center font-bold mb-4">Where would you like to start?</h1>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setSelected("blank")}
            className="btn btn-block bg-primary text-primary-content grid h-32 place-content-center rounded"
          >
            <span className="flex flex-col items-center justify-center">
              <SquarePen />
              From Scratch?
            </span>
          </button>
          <button
            disabled
            onClick={() => setSelected("image")}
            className="btn btn-block bg-accent text-accent-content grid h-32 place-content-center rounded"
          >
            <span className="flex flex-col items-center justify-center">
              <ScanText />
              From an Image
            </span>
          </button>
          <button
            disabled
            onClick={() => setSelected("url")}
            className="btn btn-block bg-secondary text-secondary-content grid h-32 place-content-center rounded"
          >
            <span className="flex flex-col items-center justify-center">
              <Link2 />
              From a Website
            </span>
          </button>
          <button
            disabled
            onClick={() => setSelected("url")}
            className="btn btn-block bg-secondary text-secondary-content grid h-32 place-content-center rounded"
          >
            <span className="flex flex-col items-center justify-center">
              <Instagram />
              From Instagram
            </span>
          </button>
        </div>
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
