import React, { useState, useEffect, useCallback } from 'react';
import { initialData, zoovuLogoCards } from './initial-data';
import { Col, Row } from 'reactstrap';
import Timer from './Timer';
import DragComponent from './DragComponent';
import DropComponent from './DropComponent';
import RandomCard from './RandomCard';
import update from 'immutability-helper';

function Board() {
  const getRandomCard = (array) => array[Math.floor(Math.random() * array.length)]
  const [hiddenCard, setHiddenCard] = useState(initialData);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [cardSocket, setCardSocket] = useState([{ droppedImg: null }, { droppedImg: null }, { droppedImg: null }, { droppedImg: null }, { droppedImg: null }])
  const [randomCard, setRandomCard] = useState(getRandomCard(zoovuLogoCards));
  const [droppedCard, setDroppedCard] = useState([]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    } else if (hiddenCard.length === 1) {
      alert('Game is over! New game will start in 10s.')
      setTimeout(() => {
        setSeconds(0);
        setIsActive(false);
      }, 10 * 1000)
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, hiddenCard]);

  const deleteItem = useCallback((id) => {
    setDroppedCard(
      update(droppedCard, { $push: [id] }),
    )
    setHiddenCard(
      hiddenCard.filter(card => card.id !== id)
    )
    setRandomCard(
      getRandomCard(hiddenCard)
    )
    console.log(droppedCard, hiddenCard)
  },
    [hiddenCard, droppedCard]
  )


  const handleDrop = useCallback(
    (index, item) => {
      const img = item.img;
      setCardSocket(
        update(
          cardSocket, {
          [index]: {
            droppedImg: {
              $set: img
            }
          }
        }
        )
      )
    },
    [cardSocket]
  );

  function toggle() {
    setIsActive(true)
  }

  
  return (
    <Row className="margin-alignment">
      <Col lg="10">
        <h3 className="component-spacing">Pickup Cards</h3>
        <Row className="component-spacing" style={{ minHeight: "320px" }}>
          {hiddenCard.map(({ id, img }, index) => {
            return <DragComponent
              className="display-cards"
              id={id}
              key={index}
              img={img}
              toggle={toggle}
              randomCard={randomCard.id}
              handleDrop={(id) => deleteItem(id)}
            />
          })}
        </Row>
        <h3 className="component-spacing">Zovu Logo</h3>
        <Row className="component-spacing">
          {cardSocket.map(({ droppedImg }, index) => (
            <DropComponent 
            key={index} 
            onDrop={item => handleDrop(index, item)} 
            droppedImg={droppedImg} 
            randomCard={randomCard.img} 
            />
          ))}
        </Row>
      </Col>
      <Col lg="2">
        <Row className="display-timer">
          <Timer seconds={seconds} isActive={isActive} toggle={toggle} setSeconds={setSeconds} />
        </Row>
        <Row>
          <div>
            <h3><u>Find this card</u></h3>
            <RandomCard randomCard={randomCard.img} />
          </div>
        </Row>
      </Col>
    </Row>
  )
}


export default Board;
