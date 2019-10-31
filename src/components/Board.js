import React, { useState, useEffect, useCallback } from 'react';
import initialData from './initial-data';
import { Col, Row } from 'reactstrap';
import Timer from './Timer';
import FlipComponent from './FlipComponent';
import DropComponent from './DropComponent';
import RandomCard from './RandomCard';

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

const SEC = 1000;

function Board() {

  const [hiddenCard, setHiddenCard] = useState(initialData);
  useEffect(() => {
    setHiddenCard(shuffleArray(hiddenCard));
    console.log(hiddenCard);
  }, [])

  const [isFlipped, changeFlip] = useState([false, false, false, false, false]);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [socketCard, setSocketCard] = useState(false, false, false, false, false);
  const [randomCard, setRandomCard] = useState(null);


  const cardToFind = getRandomCard(hiddenCard);

  const handleCardFilpping = useCallback((event) => {
    event.preventDefault()
    changeFlip(!isFlipped)
  })

  function toggle() {
    setIsActive(!isActive)
  }

  function reset() {
    setTimeout(() => {
      setSeconds(0);
      setIsActive(false);
    }, 10 * SEC)
  }


  return (
    <Row className="margin-alignment">
      <Col lg="10">
        <h3 className="component-spacing">Pickup Cards</h3>
        <Row className="component-spacing">
          {hiddenCard.map((card, index, isFlipped) => {
            return <FlipComponent className="display-cards" key={index} card={card} handleCardFilpping={handleCardFilpping} isFlipped={isFlipped} />
          })}
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
          <Timer seconds={seconds} isActive={isActive} toggle={toggle} reset={reset} setSeconds={setSeconds} />
        </Row>
        <Row>
          <div>
            <h3><u>Find this card</u></h3>
            <RandomCard cardToFind={cardToFind} />
          </div>
        </Row>
      </Col>
    </Row>
  )
}


export default Board;
