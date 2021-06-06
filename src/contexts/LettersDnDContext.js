import React, { useContext, useState, createContext } from "react";

export const LettersDrapNDropContext = createContext({
  allLetters: [],
  targetOneLetters: [],
  targetTwoLetters: [],
  addToTargetOne: null,
  addToTargetTwo: null,
});

export const LettersDragNDropProvider = (props) => {
  const initialLetters = ["A", "B", "C", "D", "E", "F"];
  const [allLetters, setAllLetters] = useState(initialLetters);

  const [targetOneLetters, setTargetOneLetters] = useState([]);
  const [targetTwoLetters, setTargetTwoLetters] = useState([]);

  const addToTargetOne = (letter) => {
    console.log("target one letters", targetOneLetters);
    let modifiedLetters = allLetters.filter((item, index) => {
      return item != letter;
    });
    setAllLetters(modifiedLetters);
    setTargetOneLetters([...targetOneLetters, letter]);
    debugger;
  };

  const addToTargetTwo = (letter) => {
    setTargetTwoLetters([...targetTwoLetters, letter]);
  };

  return (
    <LettersDrapNDropContext.Provider
      value={{
        allLetters,
        targetOneLetters,
        targetTwoLetters,
        addToTargetOne,
        addToTargetTwo,
      }}
    >
      {props.children}
    </LettersDrapNDropContext.Provider>
  );
};
