import React, { useState } from "react";
import { CirclePlus, CircleMinus, UserRound } from "lucide-react";

type Props = {
  content: {
    servingSize: string;
    calories: number;
    carbohydrates: number;
    protein: number;
    fat: number;
    fiber: number;
    sugar: number;
  };
};

function Macros({}: Props) {
  const [hasMacros, setHasMacros] = useState(false);

  return (
    <>
      {hasMacros ? (
        <div className="border border-gray-300 rounded p-4">
          <button
            className="btn btn-sm"
            onClick={(e) => {
              e.preventDefault();
              setHasMacros(false);
            }}
          >
            <CircleMinus />
            Remove
          </button>
          <div>
            <div className="form-control">
              <label className="label pb-0">
                <span className="label-text">Serving</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input type="number" defaultValue={1} className="grow" />
                <UserRound size={16} />
              </label>
            </div>
            <div className="form-control">
              <label className="label pb-0">
                <span className="label-text">Calories</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input type="number" defaultValue={0} className="grow" />
                grams
              </label>
            </div>
            <div className="form-control">
              <label className="label pb-0">
                <span className="label-text">Carbs</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input type="number" defaultValue={0} className="grow" />
                grams
              </label>
            </div>
            <div className="form-control">
              <label className="label pb-0">
                <span className="label-text">Protein</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input type="number" defaultValue={0} className="grow" />
                grams
              </label>
            </div>
            <div className="form-control">
              <label className="label pb-0">
                <span className="label-text">Fat</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input type="number" defaultValue={0} className="grow" />
                grams
              </label>
            </div>
            <div className="form-control">
              <label className="label pb-0">
                <span className="label-text">Fiber</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input type="number" defaultValue={0} className="grow" />
                grams
              </label>
            </div>
            <div className="form-control">
              <label className="label pb-0">
                <span className="label-text">Sugar</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input type="number" defaultValue={0} className="grow" />
                grams
              </label>
            </div>
          </div>
        </div>
      ) : (
        <button
          className="btn btn-block"
          onClick={(e) => {
            e.preventDefault();
            setHasMacros(true);
          }}
        >
          Add Macros? <CirclePlus />
        </button>
      )}
    </>
  );
}

export default Macros;
