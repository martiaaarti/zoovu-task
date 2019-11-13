import React from 'react';
import { CardImg } from 'reactstrap';
import { useDrag } from 'react-dnd-cjs';
import questionMark from '../img/question.png';

const DragComponent = ({ id, handleDrop, img, timeStart, randomCard }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { img, type: "CARD" },
        begin: () => (timeStart()),
        end: (item) => {
            if (randomCard === id) {
                handleDrop(id)
            }
            return item;
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });
    const opacity = isDragging ? 0 : 1;

    return (
        <span ref={drag} style={{ opacity }}>
            <CardImg className='letter-card-size card-spacing' src={questionMark} alt=" Questionmark " />
        </span>
    );
};

export default DragComponent;