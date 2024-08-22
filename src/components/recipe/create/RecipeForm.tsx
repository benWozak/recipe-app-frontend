import React from "react";
import { ArrowBigLeft } from "lucide-react";

type Props = {
  onReturnCallback: () => void;
};

function RecipeForm({ onReturnCallback }: Props) {
  return (
    <div>
      <button className="btn" onClick={onReturnCallback}>
        <ArrowBigLeft />
        Back
      </button>
      RecipeForm
    </div>
  );
}

export default RecipeForm;
