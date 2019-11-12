import React from 'react';

function Timer({ seconds }) {

    return (
        <div>
            <h3>Score: {seconds}s </h3>
        </div>
    )
}

export default React.memo(Timer);