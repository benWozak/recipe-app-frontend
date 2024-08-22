import React from "react";
import { ArrowBigLeft } from "lucide-react";

type Props = {
  onReturnCallback: () => void;
};

function ImageUploadORC({ onReturnCallback }: Props) {
  return (
    <div>
      <button className="btn" onClick={onReturnCallback}>
        <ArrowBigLeft />
        Back
      </button>
      ImageUploadORC
    </div>
  );
}

export default ImageUploadORC;
