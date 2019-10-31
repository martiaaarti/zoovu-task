import React from 'react';
import {CardImg} from 'reactstrap';

function RandomCard(props) {    
    const cardToFind = props.cardToFind;
    
    return(
        <CardImg className='letter-card-size' src={cardToFind} alt="Zoovu letter card " />
    )
}

export default React.memo(RandomCard);