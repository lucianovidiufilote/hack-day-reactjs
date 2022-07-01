import {Slider} from "@mui/material";
import constants from "../constants";
import React, { useCallback, useState } from 'react';

function SliderComponent(props) {
    let stepSize = parseInt(props.max / constants.STEPS_IN_SLIDER);

    const [inputValue, setInputValue] = useState(0)

    const handleChange = useCallback((e) => {
        setInputValue(e.target.value)
    }, [])

    return (
        <Slider
            min={props.min}
            max={props.max}
            step={stepSize}
            marks={[...Array(11).keys()].map(i => ({'value': i * stepSize, 'label': i * stepSize + '/sec'}))}
            valueLabelDisplay="on"
            color="primary"
            value={inputValue}
            onChange={handleChange}
        />
    )
}

export default SliderComponent;