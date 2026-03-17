"use client";

import Image from "next/image";
import React, { useState } from "react";

function SelectOption({ selectedStudyType }) {
  const [selectedOption, setSelectedOption] = useState("");

  const Options = [
    { name: "Exam", image: "/exam_1.png" },
    { name: "Job Interview", image: "/job.png" },
    { name: "Practice", image: "/practice.png" },
    { name: "Coding Prep", image: "/code.png" },
    { name: "Other", image: "/knowledge.png" },
  ];

  return (
    <div>
      <h1 className="text-center mb-2 text-lg font-bold">
        For which topic do you want to create a study plan?
      </h1>
      <div className="grid grid-cols-2 mt-5 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {Options.map((option) => (
          <div
            key={option.name}
            className={`flex flex-col items-center justify-center border-2 rounded-md p-5 hover:border-black cursor-pointer
              ${
                option.name === selectedOption
                  ? "border-green-500"
                  : "border-gray-300"
              }`}
            onClick={() => {
              setSelectedOption(option.name);
              selectedStudyType(option.name);
            }}
          >
            <Image
              src={option.image}
              alt={option.name}
              width={100}
              height={100}
            />
            <p className="text-center text-sm font-bold mt-2">{option.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectOption;
