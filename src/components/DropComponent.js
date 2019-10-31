import React from 'react';
import { DropTarget } from 'react-dnd-cjs';
import ItemTypes from './ItemTypes';
import { Card } from 'reactstrap';

const DropComponent = () => {
    return (
        <Card className="slot-card-size" />
    )

}

export default React.memo(DropComponent);