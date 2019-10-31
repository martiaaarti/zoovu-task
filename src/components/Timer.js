import React, { useEffect } from 'react';

function Timer(props) {
    const seconds = props.seconds;
    const isActive = props.isActive;

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                props.setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    function handleToggleClick() {
        props.toggle()
    }

    function handleResetClick() {
        props.reset()
    }

    return (
        <div>
            <h3>Score: {seconds}s </h3>
            <button onClick={handleToggleClick}>
                {isActive ? 'Pause' : 'Start'}
            </button>
            <button onClick={handleResetClick}>
                Reset
            </button>
        </div>
    )
}

export default React.memo(Timer);