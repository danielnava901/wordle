import React from "react";

const Line = ({ guess, currentLine, wordl, lineNum }) => {
  return (
    <div className="flex gap-2">
      {Array(5)
        .fill(null)
        .map((_, index) => {
          let className = "";
          if (lineNum < currentLine) {
            if (currentLine >= 1) {
              if (guess[index] === wordl[index]) {
                className = "correct";
              } else if (wordl.includes(guess[index])) {
                className = "close";
              } else {
                className = "wrong";
              }
            }
          }

          return (
            <div key={index} className={`tile ${className} upper`}>
              {guess[index]}
            </div>
          );
        })}
    </div>
  );
};

export default Line;
