import React from "react";
import Line from "./Line.jsx";

const Board = ({ guesses, currentLine, wordl }) => {
  return (
    <div className="board flex flex-col gap-2 w-full items-center h-full justify-center">
      {guesses.map((guess, index) => {
        return (
          <Line
            key={index}
            lineNum={index}
            guess={guess}
            currentLine={currentLine}
            wordl={wordl}
          />
        );
      })}
    </div>
  );
};

export default Board;
