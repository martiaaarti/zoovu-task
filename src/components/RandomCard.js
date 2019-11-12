import React from 'react';
import {CardImg} from 'reactstrap';

function RandomCard({randomCard}) {   
    return(
        <CardImg className='letter-card-size' src={randomCard} alt="Zoovu letter card " />
    )
}

export default React.memo(RandomCard);