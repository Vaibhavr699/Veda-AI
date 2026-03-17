import React from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TopicInput({setTopic, setDifficulty}) {
  return (
    <div className="flex flex-col items-center justify-center w-full px-4 md:px-6 lg:px-14 py-4">
      <h1 className="text-3xl md:text-2xl font-bold text-center mb-2 text-gray-800">
        What topic do you want to study?
      </h1>

      <Textarea
        placeholder="Start typing or paste the topic you want to study"
        className="w-full max-w-2xl h-30 text-base md:text-lg p-5 resize-none border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        onChange={(e) => setTopic(e.target.value)}
      />

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-700 text-center">
        Select difficulty level
      </h2>
      <Select onValueChange={(value) => setDifficulty(value)}>
        <SelectTrigger className="w-full max-w-sm border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <SelectValue placeholder="Choose difficulty level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="easy">Easy</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="hard">Hard</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default TopicInput;
