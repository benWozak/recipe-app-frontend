import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookText, NotebookPen } from "lucide-react";

type Props = {};

function BottomNav({}: Props) {
  const [selected, setSelected] = useState<string | null>();
  return (
    <nav className="btm-nav sticky bottom-0">
      <Link
        to="/list"
        onClick={() => setSelected("list")}
        className={`${
          selected === "list" ? "active border-blue-600" : ""
        }bg-blue-200 text-blue-600 `}
      >
        <BookText />
        <span className="btm-nav-label">Recipes</span>
      </Link>
      <Link
        to="/editor"
        onClick={() => setSelected("editor")}
        className={`${
          selected === "editor" ? "active border-blue-600" : ""
        }bg-blue-200 text-blue-600 `}
      >
        <NotebookPen />
        <span className="btm-nav-label">Create</span>
      </Link>
    </nav>
  );
}

export default BottomNav;
