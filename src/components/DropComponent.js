import React from 'react';
import { useDrop } from 'react-dnd-cjs';
import { CardImg } from 'reactstrap';

function checkIfCanDrop(item, selectedCard) {
    const img = item.img;
    if (img === selectedCard){
        return true;
    }
    return false;
  }

const DropComponent = ({droppedImg, onDrop, randomCard}) => {
    const [{ hovered }, drop] = useDrop({
        accept: "CARD",
        canDrop: (item) => checkIfCanDrop(item, randomCard),
        drop: onDrop,
        collect: monitor => ({             
              hovered: monitor.isOver(),
              item: monitor.getItem()             
            })
    })

    const backgroundColor = hovered ? 'grey' : 'white';
    return (
        <span ref={drop} style={{backgroundColor}}>
        <CardImg className="slot-card-size" src={droppedImg} />
        </span>
    )

}

export default React.memo(DropComponent);