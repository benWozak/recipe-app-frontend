import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { urlRegex, instagramRegex } from "../../../util/RegEx";

import { ArrowBigLeft } from "lucide-react";
import Macros from "./Macros";
import RecipeEditor from "./RecipeEditor";

// Zod schema for a single ingredient
const ingredientSchema = z.object({
  name: z.string().min(1, { message: "Ingredient name is required" }),
  amount: z.string().optional(),
  unit: z.string().optional(),
});

// Zod schema for an ingredient group
const ingredientGroupSchema = z.object({
  groupName: z.string().min(1, { message: "Group name is required" }),
  ingredients: z.array(ingredientSchema).min(1, { message: "At least one ingredient is required" }),
});

const recipeSchema = z.object({
  name: z.string().min(1, { message: "Recipe name is required" }),
  source: z.string().refine(
    (value) => {
      return urlRegex.test(value) || instagramRegex.test(value);
    },
    {
      message: "Input must be a valid website URL or Instagram link",
    }
  ),
  prepTime: z.string().optional(),
  cookTime: z.string().optional(),
  servings: z.string().optional(),
  ingredients: z.array(ingredientGroupSchema).min(1, { message: "At least one ingredient group is required" }),
  instructions: z.array(
    z.object({
      step: z.string().min(1, { message: "Instruction step is required" }),
    })
  ),
  notes: z.string().optional(),
  macros: z.object({
    servingSize: z.string(),
    calories: z.number().nonnegative(),
    carbohydrates: z.number().nonnegative(),
    protein: z.number().nonnegative(),
    fat: z.number().nonnegative(),
    fiber: z.number().nonnegative(),
    sugar: z.number().nonnegative(),
  }),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

interface ImageData {
  data: string;
  mimeType: string;
}

type Props = {
  onReturnCallback: () => void;
};

function RecipeForm({ onReturnCallback }: Props) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [duration, setDuration] = useState({
    prep: { time: 0, frame: "mins" },
    cook: { time: 0, frame: "mins" },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    mode: "onBlur",
    defaultValues: {
      ingredients: [{ groupName: "", ingredients: [{ name: "", amount: "", unit: "" }] }],
      instructions: [{ step: "" }],
      macros: {
        servingSize: "",
        calories: 0,
        carbohydrates: 0,
        protein: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,
      },
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = (file: File, maxSize: number): Promise<ImageData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);

          const resizedDataUrl = canvas.toDataURL(file.type);
          resolve({
            data: resizedDataUrl.split(",")[1], // Base64 data
            mimeType: file.type,
          });
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (data: RecipeFormData) => {
    if (!imageFile) {
      alert("Please select an image");
      return;
    }

    // Handle image processing
    const fullImage: ImageData = await processImage(imageFile, 1000); // Full size
    const thumbnail: ImageData = await processImage(imageFile, 150); // Thumbnail

    const completeData = {
      ...data,
      fullImage,
      thumbnail,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log(completeData);
    // Handle form submission to server
  };

  function getTotalDuration() {
    const totalMinutes =
      (duration.prep.frame === "hours" ? duration.prep.time * 60 : duration.prep.time) +
      (duration.cook.frame === "hours" ? duration.cook.time * 60 : duration.cook.time);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}mins`;
  }

  return (
    <div className="h-4/5 overflow-y-auto">
      <div className="fixed top-2 left-2">
        <button className="btn" onClick={onReturnCallback}>
          <ArrowBigLeft />
          Back
        </button>
      </div>
      <div className="card w-fit border border-spacing-1 border-gray-300 rounded-md">
        <div className="card-body">
          <h2 className="card-title">Recipe</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-[80vw] min-w-80 p-4">
          <div className="form-control">
            <label className="label pb-0">
              <span className="label-text">Recipe Name</span>
            </label>
            <input type="text" {...register("name")} className="input input-bordered input-sm" />
            {errors.name && <span className="text-error">{errors.name.message}</span>}
          </div>

          <div className="form-control">
            <label className="label pb-0">
              <span className="label-text">Recipe Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered file-input-sm w-full max-w-xs"
            />
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 max-w-xs" />}
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="form-control">
              <label className="label pb-0">
                <span className="label-text">Prep Time</span>
              </label>
              <div className="join">
                <input
                  type="number"
                  {...register("prepTime")}
                  className="input input-bordered input-sm w-24 pr-1"
                  value={duration.prep.time}
                  onChange={(e) =>
                    setDuration({
                      ...duration,
                      prep: {
                        ...duration.prep,
                        time: parseInt(e.target.value),
                      },
                    })
                  }
                />
                <select
                  className="select select-bordered select-sm join-item"
                  onChange={(e) =>
                    setDuration({
                      ...duration,
                      prep: {
                        ...duration.prep,
                        frame: e.target.value,
                      },
                    })
                  }
                  value={duration.prep.frame}
                >
                  <option value="mins">mins</option>
                  <option value="hours">hours</option>
                </select>
              </div>
              {errors.prepTime && <span className="text-error">{errors.prepTime.message}</span>}
            </div>
            <div className="form-control">
              <label className="label pb-0">
                <span className="label-text">Cook Time</span>
              </label>
              <div className="join">
                <input
                  type="number"
                  {...register("cookTime")}
                  className="input input-bordered input-sm w-24 pr-1"
                  value={duration.cook.time}
                  onChange={(e) =>
                    setDuration({
                      ...duration,
                      cook: {
                        ...duration.cook,
                        time: parseInt(e.target.value),
                      },
                    })
                  }
                />
                <select
                  className="select select-bordered select-sm join-item"
                  onChange={(e) =>
                    setDuration({
                      ...duration,
                      cook: {
                        ...duration.cook,
                        frame: e.target.value,
                      },
                    })
                  }
                  value={duration.cook.frame}
                >
                  <option value="mins">mins</option>
                  <option value="hours">hours</option>
                </select>
              </div>
              {errors.cookTime && <span className="text-error">{errors.cookTime.message}</span>}
            </div>
            <div className="form-control">
              <label className="label pb-0">
                <span className="label-text">Total Time</span>
              </label>
              <input type="text" className="input input-bordered input-sm" readOnly value={getTotalDuration()} />
            </div>
          </div>
          <div className="form-control">
            <label className="label pb-0">
              <span className="label-text">Servings</span>
            </label>
            <input
              type="number"
              {...register("servings")}
              className="input input-bordered input-sm w-24 pr-1"
              defaultValue={4}
            />
            {errors.servings && <span className="text-error">{errors.servings.message}</span>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Ingredients</span>
            </label>
            <Controller
              name="ingredients"
              control={control}
              render={({ field }) => (
                <RecipeEditor
                  content={field.value}
                  onChange={(content) => {
                    field.onChange(content);
                    field.onBlur();
                  }}
                />
              )}
            />
          </div>

          <div className="form-control">
            <label className="label pb-0">
              <span className="label-text">Instructions</span>
            </label>
            <Controller
              name="instructions"
              control={control}
              render={({ field }) => (
                <RecipeEditor
                  content={field.value}
                  onChange={(content) => {
                    field.onChange(content);
                    field.onBlur();
                  }}
                />
              )}
            />
          </div>

          <div className="form-control">
            <label className="label pb-0">
              <span className="label-text">Macros</span>
            </label>
            <Controller name="macros" control={control} render={({ field }) => <Macros content={field.value} />} />
          </div>

          <div className="form-control">
            <label className="label pb-0">
              <span className="label-text">Recipe Notes</span>
            </label>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <RecipeEditor
                  content={field.value}
                  onChange={(content) => {
                    field.onChange(content);
                    field.onBlur();
                  }}
                />
              )}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
}

export default RecipeForm;
