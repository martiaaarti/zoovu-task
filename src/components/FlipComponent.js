import React from 'react';
import { CardImg } from 'reactstrap';
import ReactCardFlip from 'react-card-flip';
import { useDrag } from 'react-dnd-cjs';
import questionMark from '../img/question.png';

const FlipComponent = ({ card, isFlipped, id, handleDrop }) => {
    const [{ isDragging }, drag] = useDrag({
        item: {id: id, type: "CARD" },
        begin: (card) => {
            console.log('dragging')
            return card
        },
        end: (monitor) => {
            if(!monitor.didDrop()) {
                return;
            }
            return handleDrop(id)
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });
    const opacity = isDragging ? 0 : 1;

    // function handleClick(event) {
    //     handleCardFilpping(event,index)
    // }

    return (
        <span ref={drag} style={{ opacity }}>
        <ReactCardFlip
            isFlipped={isFlipped}
            flipDirection="horizontal"
        >
            <span key="front" 
            // onClick={handleClick}
            >
                <CardImg className='letter-card-size card-spacing' src={questionMark} alt=" Questionmark " />
            </span>

            <span key="back" 
            // onClick={handleClick}
            >
                <CardImg className='letter-card-size card-spacing' src={card} alt="Zoovu letter card " />
            </span>
        </ReactCardFlip>
        </span>        
    );
};

export default React.memo(FlipComponent);