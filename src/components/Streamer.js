import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextareaAutosize, useMediaQuery, useTheme
} from "@mui/material";

const socket = new WebSocket("ws://127.0.0.1:20000/ws");

function Streamer(props) {
    var buffer = '';
    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        setOpen(false);
        buffer = buffer + "\n" + 'You should start seeing row info appearing at a pace of: '+ props.speed + '/sec' + "\n";
        setMessage(buffer);
        socket.send(JSON.stringify({
            'action': 'Start',
            'url': props.url,
            'speed': parseInt(props.speed)
        }))
    };

    useEffect(() => {
        socket.onopen = () => {
            //setMessage('Connected')
        };

        socket.onmessage = (e) => {
            buffer = buffer + "\n" + e.data
            setMessage(buffer)
        };

        return () => {
            socket.close()
        }
    }, [])

    return (
        <div className="App">
            <Grid item xs={12}>
                <Button variant="contained" onClick={handleClickOpen}>Start</Button>
            </Grid>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
                <br/>
                <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="...Waiting for confirm action"
                    minRows={10}
                    cols={20}
                    style={{width: '100%'}}
                    value={message}
                />
            </Grid>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Confirm feed parse start"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        A product feed parse will start! Do you still want to continue?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Nope
                    </Button>
                    <Button onClick={handleConfirm} autoFocus>
                        Go!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Streamer;