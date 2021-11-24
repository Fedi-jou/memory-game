import { useState, useEffect } from "react";
import Singlecard from "./components/Singlecard";
import "./App.css";

const cardimgs = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceone, setChoiceone] = useState(null);
  const [choicetwo, setChoicetwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const shufflecards = () => {
    const shuffledcards = [...cardimgs, ...cardimgs]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceone(null);
    setChoicetwo(null);
    setCards(shuffledcards);
    setTurns(0);
  };
  // console.log(cards, turns);
  const handlechoice = (card) => {
    choiceone ? setChoicetwo(card) : setChoiceone(card);
    console.log(choiceone);
    console.log(choicetwo);
  };
  const resetturns = () => {
    setChoiceone(null);
    setChoicetwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };
  // comparing 2 cards
  useEffect(() => {
    if (choiceone && choicetwo) {
      setDisabled(true);
      if (choiceone.src === choicetwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceone.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetturns();
      } else {
        console.log("not matching cards");
        setTimeout(() => resetturns(), 600);
      }
    }
    console.log(turns);
  }, [choiceone, choicetwo]);
  console.log(cards);
  // starting the game auto

  useEffect(() => {
    shufflecards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shufflecards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Singlecard
            handlechoice={handlechoice}
            card={card}
            key={card.id}
            flipped={card === choiceone || card === choicetwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default App;
