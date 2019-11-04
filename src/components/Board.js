import React, { useState, useEffect, useCallback } from 'react';
import initialData from './initial-data';
import { Col, Row } from 'reactstrap';
import Timer from './Timer';
import FlipComponent from './FlipComponent';
import DropComponent from './DropComponent';
import RandomCard from './RandomCard';

function getRandomCard(array) {
  let randomOne = array[Math.floor(Math.random() * array.length)]
  array.filter(card => card.id !== randomOne.id)
  return randomOne;
}

function Board() {

  const [hiddenCard, setHiddenCard] = useState(initialData);
  const [isFlipped, changeFlip] = useState([false, false, false, false, false]);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [socketCard, setSocketCard] = useState(false, false, false, false, false);
  const [randomCard, setRandomCard] = useState(null);


  const cardToFind = getRandomCard(hiddenCard);

  const deleteItem = useCallback((id) => {
    console.log("deleted"+ id)
    setHiddenCard(
      hiddenCard.filter(card => card.id !== id)      
    )
    },
    [hiddenCard]
  ) 

  // const handleCardFilpping = useCallback((event, index) => {
  //   console.log(index)
  //   event.preventDefault()
  //   changeFlip(isFlipped[index] === true)
  //   console.log(isFlipped[index])
  // })

  function toggle() {
    setIsActive(!isActive)
  }

  function reset() {
    setTimeout(() => {
      setSeconds(0);
      setIsActive(false);
    }, 10 * 1000)
  }


  return (
    <Row className="margin-alignment">
      <Col lg="10">
        <h3 className="component-spacing">Pickup Cards</h3>
        <Row className="component-spacing">
          {hiddenCard.map((card, index) => {
            return <FlipComponent className="display-cards" id={card.id} key={card.id} card={card.img} toggle={toggle}  handleDrop={(id) => deleteItem(id)} />
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
            <RandomCard cardToFind={cardToFind.img} />
          </div>
        </Row>
      </Col>
    </Row>
  )
}


export default Board;
