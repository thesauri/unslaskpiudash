import React from 'react';
import "./Game.css";
import image1 from "./images/1.png";
import image2 from "./images/2.jpg";
import image3 from "./images/3.jpg";
import image4 from "./images/4.png";
import image5 from "./images/5.png";
import image6 from "./images/6.png";
import image7 from "./images/7.png";
import image8 from "./images/8.jpg";
import image9 from "./images/9.jpg";
import image10 from "./images/10.png";
import image11 from "./images/11.png";
import image12 from "./images/12.png";
import image13 from "./images/13.jpg";
import image14 from "./images/14.jpg";
import image15 from "./images/15.jpg";
import image16 from "./images/16.png";
import image17 from "./images/17.png";
import image18 from "./images/18.png";
import image19 from "./images/19.png";

import { useState } from 'react';
import api from "./api";
import mysteryMan from "./images/mystery-man.png";

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16, image17, image18, image19];
const rules = [
  "Ta en shot",
  "Ge 3 klunkar till någon",
  "Välj en drinking buddy (dricker alltid då du dricker) ",
  "7 regeln (man räknar från 1 uppåt, alla siffror delbara med 7 eller innehåller 7 → kossu) ",
  "Question master (om nån svarar på personens fråga måste den dricka) ",
  "Hitta på en regel",
  "Får inte tala något annat än finska",
  "Måste läsa upp första meddelandet när man söker på ordet (hahha int vet ja typ: wtf, lol, full…) ",
  "Drick upp och ner",
  "Hämta en sten utifrån",
  "Dra in en snapsvisa",
  "Måste dricka så många klunkar som de finns saker upphängda på väggen i kämppän (eller var man nu en befinner sig) ",
  "Shot roulette (fyll 5 shottar, 2 med sprit 3 utan, rulla en penna i mitten) ",
  "Alias (förklara föremålet på din vänstra sida) ",
  "Den som först får en notifikation på telefonen dricker",
  "Den som senast ringt mamma får ge ut 5 klunkar",
  "Mät kroppstemperaturen, om över 36,5° drick 5, om under ge 5",
  "Visa senaste gifen du använt",
  "Finish your drink! ",
];

function Game(props) {
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [currentCard, setCurrentCard] = useState(0);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [players, setPlayers] = useState([]);

  api.onNewCard((newCard) => {
    setIsCardVisible(true);
    setCurrentCard(newCard);
  });
  api.onNewPlayers((newPlayers) => {
    setPlayers(newPlayers);
  });
  api.onNewCurrentPlayer((newCurrentPlayer) => {
    setIsCardVisible(false);
    setCurrentPlayer(newCurrentPlayer);
  });

  return (
      <>
        <div>
            <div className="player-list">
              { players.map(player => <p className={`player-item ${player === currentPlayer && "player-active"}`} key={player}>{player}</p>) }
            </div>
            <img src={isCardVisible ? images[currentCard] : mysteryMan} className="image" />
            <p className="action">
              { isCardVisible && rules[currentCard]}
            </p>
            { props.name === currentPlayer &&
              <button className="button" onClick={() => {
                if (isCardVisible) {
                  api.requestNextPlayer();
                } else {
                  api.requestNextCard();
                }
                }}>
                {isCardVisible ? "Nästa spelare" : "Ta ett kort!"}
              </button>
            }
        </div>
      </>
  );
}

export default Game;
