import React from 'react';
import { useDrop } from 'react-dnd-cjs';
import { CardImg } from 'reactstrap';

const DropComponent = () => {
    const [{ hovered, canDrop }, drop] = useDrop({
        accept: "CARD",
        collect: monitor => {
            return {
              hovered: monitor.isOver(),
              item: monitor.getItem()
            };
          }      
    })
    const backgroundColor = hovered ? 'grey' : 'white';
    return (
        <span ref={drop} style={{backgroundColor}}>
        <CardImg className="slot-card-size"  />
        </span>
    )

}

export default React.memo(DropComponent);