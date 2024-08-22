/**********************************************
 *                Ingredients                 *
 **********************************************/
export interface Ingredient {
  item: string;
  amount?: string;
  unit?: string;
}

export interface IngredientGroup {
  groupName: string;
  ingredients: Ingredient[];
}

export type IngredientList = Ingredient[] | IngredientGroup[];

/**********************************************
 *                Instructions                *
 **********************************************/

export interface Instruction {
  step: string;
}

export interface InstructionGroup {
  groupName: string;
  instructions: Instruction[];
}

export type InstructionList = Instruction[] | InstructionGroup[];

/**********************************************
 *                Macro Nutrients             *
 **********************************************/

export interface Macros {
  servingSize: string;
  calories: number;
  carbohydrates: number;
  protein: number;
  fat: number;
  fiber: number;
  sugar: number;
}

/**********************************************
 *                Image Metadata              *
 **********************************************/

export interface ImageEntry {
  id: number;
  title: string;
  description: string;
  fullImage: {
    data: string; // Base64 encoded string or URL to the full image
    mimeType: string;
  };
  thumbnail: {
    data: string; // Base64 encoded string
    mimeType: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Recipe {
  id: number;
  title: string;
  image: ImageEntry | null;
  prepTime: string | null;
  cookTime: string | null;
  totalTime: string | null;
  servingSize: string | null;
  ingredients: IngredientList;
  instructions: InstructionList;
  notes?: string[] | null;
  macros: Macros | null;
}
