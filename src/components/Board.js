import React, { useState, useEffect, useCallback } from 'react';
import { initialData, zoovuLogoCards } from './initial-data';
import { Col, Row } from 'reactstrap';
import Timer from './Timer';
import DragComponent from './DragComponent';
import DropComponent from './DropComponent';
import RandomCard from './RandomCard';
import update from 'immutability-helper';


function Board() {
  const [hiddenCard, setHiddenCard] = useState(initialData);
  const [randomCard, setRandomCard] = useState({});
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [cardSocket, setCardSocket] = useState([{ droppedImg: null }, { droppedImg: null }, { droppedImg: null }, { droppedImg: null }, { droppedImg: null }])

  function getRandomCard(array) {
    return array[Math.floor(Math.random() * array.length)]
  }

  function timeStart() {
    setIsActive(true)
  }

  function resetApp() {
    return new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
  }

  const deleteItem = useCallback((id) => {
    const updatedSetOfCards = hiddenCard.filter(currCard => currCard.id !== id)
    setHiddenCard(updatedSetOfCards)
    const selectedCard = getRandomCard(updatedSetOfCards)
    setRandomCard(selectedCard)
    console.log(hiddenCard)
  }, [hiddenCard]);

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
    [cardSocket]);

  const resetCallback = useCallback(() => {
    setHiddenCard(initialData)
    setRandomCard({})
    setSeconds(0)
    setIsActive(false)
    setCardSocket([{ droppedImg: null }, { droppedImg: null }, { droppedImg: null }, { droppedImg: null }, { droppedImg: null }])
  }, [initialData])

  useEffect(() => {
    setRandomCard(getRandomCard(zoovuLogoCards))
    return () => { }
  }, [])

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    if (hiddenCard.length === 0) {
      if (confirm(`Congrats, you completed the game in ${seconds}s!`)) {
        //Code to restart app
      }
    }
  }, [hiddenCard]);

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
              timeStart={timeStart}
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
          <Timer seconds={seconds} isActive={isActive} setSeconds={setSeconds} />
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
