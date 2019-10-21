import React, { useState, useCallback } from 'react';
import { CardImg } from 'reactstrap';
import ReactCardFlip from 'react-card-flip';
import { DragSource } from 'react-dnd-cjs';
import ItemTypes from './ItemTypes';
import questionMark from '../img/question.png';

const FlipComponent = ({ card, isDragging, connectDragSource }) => {
    const [isFlipped, changeFlip] = useState(false);
    const handleClick = useCallback((event) => {
        event.preventDefault()
        changeFlip(!isFlipped)
    })
    return (
        <ReactCardFlip
            isFlipped={isFlipped}
            flipDirection="horizontal"
        >
            <span key="front" onClick={handleClick}>
                <CardImg className='letter-card-size card-spacing' src={questionMark} alt=" Questionmark " />
            </span>

            <span key="back" onClick={handleClick}>
                <CardImg className='letter-card-size card-spacing' src={card.logoImg} alt="Zoovu letter card " />
            </span>
        </ReactCardFlip>
    );
};

export default DragSource(
    ItemTypes.CARD,
    {
        beginDrag: () => ({}),
        endDrag: () => ({})
    },
    (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }),
)(FlipComponent);