import React from "react";
import { ArrowBigLeft } from "lucide-react";

type Props = {
  onReturnCallback: () => void;
};

function URLParser({ onReturnCallback }: Props) {
  return (
    <div>
      <button className="btn" onClick={onReturnCallback}>
        <ArrowBigLeft />
        Back
      </button>
      URLParser
    </div>
  );
}

export default URLParser;
