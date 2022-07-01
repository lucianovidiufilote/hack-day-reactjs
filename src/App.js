import SliderComponent from "./components/Slider";
import Streamer from "./components/Streamer";
import {
    Card,
    CardContent,
    Grid,
    CardHeader,
    FormControl,
    InputLabel,
    Input,
    FormHelperText, Slider
} from "@mui/material";
//import FeedUrl from "./components/FeedUrl";
import React, {useCallback, useEffect, useState} from 'react';
import validator from "validator";
import constants from "./constants";


export default function App() {

    const [errorMessage, setErrorMessage] = useState('')
    const [feedUrlValue, setFeedUrlValue] = useState('')
    const [speed, setSpeed] = useState(1)

    const validate = (value) => {
        setFeedUrlValue(value)
        if (value == '' || validator.isURL(value)) {
            setErrorMessage('')
        } else {
            setErrorMessage('Is not a valid URL')
        }
    }

    let stepSize = parseInt(10 / constants.STEPS_IN_SLIDER);

    const handleChange = useCallback((e) => {
        setSpeed(e.target.value)
    }, [])

    return (
        <div>
            <div style={{width: '50%', margin: '0 auto', marginTop: '100px'}}>
                <Card sx={{minWidth: 275}}>
                    <CardContent>
                        <CardHeader
                            title={"Welcome to React, Go, Websockets and Material UI hack day!"}>
                        </CardHeader>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {/*<FeedUrl/>*/}
                                <FormControl>
                                    <InputLabel htmlFor="my-input">Feed url</InputLabel>
                                    <Input id="my-input"
                                           variant="outlined"
                                           value={feedUrlValue}
                                           onChange={(e) => validate(e.target.value)}
                                           fullWidth={true}></Input>
                                    <FormHelperText id="my-helper-text">Just add the feed url you received from the
                                        customer</FormHelperText>
                                    <span style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                    }}>{errorMessage}</span>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}></Grid>
                            <Grid item xs={12}></Grid>
                            <Grid item xs={8}>
                                <FormControl fullWidth={true}>
                                    <div style={{width: "10px", height: "10px", display: "inline-block"}}></div>
                                    {/*<SliderComponent min={0}*/}
                                    {/*                 max={10}*/}
                                    {/*                 style={{display: "inline-block"}}/>*/}
                                    <Slider
                                        aria-label="asgagsagsagas"
                                        min={1}
                                        max={10}
                                        step={stepSize}
                                        marks={[...Array(11).keys()].map(i => ({'value': i * stepSize, 'label': i * stepSize + '/sec'}))}
                                        valueLabelDisplay="on"
                                        color="primary"
                                        value={speed}
                                        onChange={handleChange}
                                    />
                                    <FormHelperText id="my-helper-text2">Select the speed you want to see the products
                                        parsed</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={12}>
                                <Streamer
                                    speed={speed}
                                    url={feedUrlValue}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
