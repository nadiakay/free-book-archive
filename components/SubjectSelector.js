import { useState, useEffect } from "react";
import Link from "next/link";
import cn from "classnames";
import modal from "./modal.module.css";

export default function SubjectSelector() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div className="relative">
      <a
        href="/subject"
        className={cn(
          { underline: modalVisible },
          "flex flex-row items-center justify-center"
        )}
        onClick={e => {
          e.preventDefault();
          console.log("click");
          setModalVisible(!modalVisible);
          console.log("modalVisible:", modalVisible);
        }}
      >
        <span>Subjects</span>
        <svg
          className="mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </a>
      <ul
        className={cn(
          { [modal.hidden]: !modalVisible },
          "border border-slate-400 rounded-md absolute mt-2 right-0 left-0 space-y-3 p-3 bg-white"
        )}
      >
        <li>Science</li>
        <li>Math</li>
      </ul>
    </div>
  );
}
