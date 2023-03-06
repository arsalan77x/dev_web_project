import React, { useEffect, useState } from 'react'
import './Timer.scss'

const Timer = props => {

    useEffect(() => {
        props.seconds > 0 && setTimeout(() => props.setSeconds(props.seconds - 1), 1000);
      }, [props.seconds]);

    return (
        <div className="timerContainer">
            <p className="timerText">{props.seconds}</p>:
            <p className="timerText">{0}</p>
        </div>
    )
}

export default Timer