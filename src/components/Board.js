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
  const [droppedCard, setDroppedCard] = useState([]);

  function getRandomCard(array){
    return array[Math.floor(Math.random() * array.length)]
  }

  useEffect(() => {
    setRandomCard(getRandomCard(zoovuLogoCards))
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
      alert(`Congrats, you completed the game in ${seconds}s!`)
      setTimeout(() => {
        setHiddenCard(initialData);
        setSeconds(0);
        setIsActive(false);
        setCardSocket([{ droppedImg: null }, { droppedImg: null }, { droppedImg: null }, { droppedImg: null }, { droppedImg: null }]);
        setRandomCard(getRandomCard(zoovuLogoCards));
        setDroppedCard([])
      }, 10 * 1000)
    }
  },[hiddenCard, seconds, isActive, cardSocket, randomCard, droppedCard]);

  const deleteItem = useCallback((id) => {
    setHiddenCard(
      hiddenCard.filter(card => card.id !== id)
    )
    console.log(hiddenCard)
    if (droppedCard.length === 0) {
      setDroppedCard(droppedCard.push(id))
    } else {
      setDroppedCard([...droppedCard, id])
    }
    console.log(droppedCard, droppedCard.length)
    setRandomCard(
      getRandomCard(zoovuLogoCards.filter( el => !droppedCard.includes(el.id)))
    )
    console.log(zoovuLogoCards.filter( el => !droppedCard.includes(el.id)), getRandomCard(zoovuLogoCards.filter( el => !droppedCard.includes(el.id))))
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
