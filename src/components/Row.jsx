import React from "react";
import "../styles/Row.css";

const Row = ({ guess, isFinalGuess, solution }) => {
  const cells = [];

  for (let i = 0; i < 5; i++) {
    const letter = guess[i];
    let classNames = "tile";

    if (isFinalGuess) {
      if (letter === solution[i]) {
        classNames += " correct";
      } else if (solution.includes(letter)) {
        //check for duplicates
        const solutionLetters = solution.split("");
        solutionLetters.forEach((solutionLetter, j) => {
          if (
            letter === solutionLetter &&
            i !== j &&
            guess[j] === solution[j]
          ) {
            classNames += " incorrect";
          }
        });

        classNames += " other-position";
      } else classNames += " incorrect";
    }

    cells.push(
      <span
        key={i}
        data-delay={i}
        className={`cell ${classNames}`}
        style={{ transitionDelay: `${i / 10}s` }}
      >
        {letter}
      </span>
    );
  }

  return <div className="row">{cells}</div>;
};

export default Row;
