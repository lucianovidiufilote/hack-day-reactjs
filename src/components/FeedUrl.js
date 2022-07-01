import {useState} from "react";
import validator from 'validator'
import {FormControl, FormHelperText, Input, InputLabel} from "@mui/material";

function FeedUrl(){
    const [errorMessage, setErrorMessage] = useState('')
    const [feedUrlValue, setFeedUrlValue] = useState('')

    const validate = (value) => {

        if (validator.isURL(value)) {
            setErrorMessage('')
        } else {
            setErrorMessage('Is not a valid URL')
        }
    }

    return (
        <FormControl>
            <InputLabel htmlFor="my-input">Feed url</InputLabel>
            <Input id="my-input"
                   variant="outlined"
                   value={feedUrlValue}
                   onChange={(e) => validate(e.target.value)}
                   fullWidth={true}></Input>
            <FormHelperText id="my-helper-text">Just add the feed url you received from the customer</FormHelperText>
            <span style={{
                fontWeight: 'bold',
                color: 'red',
            }}>{errorMessage}</span>
        </FormControl>
    );
}

export default FeedUrl