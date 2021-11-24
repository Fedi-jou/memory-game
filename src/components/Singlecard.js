import React from "react";
import "./Singlecard.css";

function Singlecard({ card, handlechoice, flipped, disabled }) {
  const handleclick = () => {
    if (!disabled) {
      handlechoice(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="loading card front" />
        <img
          className="back"
          src="/img/cover.png"
          alt="loading card cover"
          onClick={handleclick}
        />
      </div>
    </div>
  );
}

export default Singlecard;
