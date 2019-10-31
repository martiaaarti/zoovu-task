import React, { useState, useCallback } from 'react';
import initialData from './initial-data';
import { Col, Row, CardImg } from 'reactstrap';
import Timer from "react-compound-timer";
import FlipComponent from './FlipComponent';
import DropComponent from './DropComponent';

function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function getRandomCard(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function Board(props) {

  const [hiddenCard, setHiddenCard] = useState(initialData);
  const [isFlipped, changeFlip] = useState([false, false, false, false, false]);
  const [socketCard, setSocketCard] = useState(false, false, false, false, false);
  const [randomCard, setRandomCard] = useState(null);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleCardFilpping = useCallback((event) => {
    event.preventDefault()
    changeFlip(!isFlipped)
})

  const shuffledArray = shuffleArray(hiddenCard.cards);
  const cardToFind = getRandomCard(hiddenCard.cards);
  const cardList = shuffledArray.map((card, index, isFlipped) => {
    return <FlipComponent className="display-cards" key={index} card={card} handleCardFilpping={handleCardFilpping} isFlipped={isFlipped}/>
  });
  return (
    <Row className="margin-alignment">
      <Col lg="10">
        <h3 className="component-spacing">Pickup Cards</h3>
        <Row className="component-spacing">
          {cardList}
        </Row>
        <h3 className="component-spacing">Zovu Logo</h3>
        <Row className="component-spacing">
          <DropComponent />
          <DropComponent />
          <DropComponent />
          <DropComponent />
          <DropComponent />
        </Row>
      </Col>
      <Col lg="2">
        <Row className="display-timer">
          <Timer>
            <h3>Score: <Timer.Seconds /> seconds</h3>
          </Timer>
        </Row>
        <Row>
          <div>
            <h3><u>Find this card</u></h3>
            <CardImg className='letter-card-size' src={cardToFind} alt="Zoovu letter card " />
          </div>
        </Row>
      </Col>
    </Row>
  )
}


export default Board;
