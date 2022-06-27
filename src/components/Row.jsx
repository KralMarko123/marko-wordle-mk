import React, { useEffect } from "react";
import "../styles/Row.css";

const Row = ({ guess, isFinalGuess, solution }) => {
  const cells = [];

  useEffect(() => {});

  for (let i = 0; i < 5; i++) {
    const letter = guess[i];
    let classNames = "tile";

    if (isFinalGuess) {
      if (letter === solution[i]) {
        classNames += " correct";
      } else if (solution.includes(letter)) {
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
