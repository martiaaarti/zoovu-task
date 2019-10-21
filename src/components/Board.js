import React, { Component } from 'react';
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

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialData
    }
  }

  render() {
    const shuffledArray = shuffleArray(this.state.initialData.cards);
    const cardToFind = getRandomCard(this.state.initialData.cards);
    const cardList = shuffledArray.map((card, index) => {
      return <FlipComponent className="display-cards" key={index} card={card} />
    });
    return (
      <Row className="margin-alignment">
        <Col lg="8">
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
        <Col lg="4">
          <Row className="display-timer">
            <Timer>
              <h3>Score: <Timer.Seconds /> seconds</h3>
            </Timer>
          </Row>
          <Row>
            <div>
              <h3><u>Find this card</u></h3>
              <CardImg className='letter-card-size' src={cardToFind.logoImg} alt="Zoovu letter card " />
            </div>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default Board;
