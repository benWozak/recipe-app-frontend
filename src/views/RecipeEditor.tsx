import React from "react";
import MethodSelector from "../components/recipe/create/methodSelector";

type Props = {};

const STORED_RECIPE_PLACEHOLDER = null;
function RecipeEditor({}: Props) {
  if (!STORED_RECIPE_PLACEHOLDER) {
    return <MethodSelector />;
  }
  return <div>RecipeEditor</div>;
}

export default RecipeEditor;
