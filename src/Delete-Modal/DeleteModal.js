import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteModal = ({ open, deleteData, close, content }) => {
    let records = useSelector(state => state.user.users);
    const [modalMsg, setModalMsg] = useState("");

    useEffect(() => {
        if(content.length == 1){
            let name;
            records.map(user => {
                if(user.id === content[0].id){
                    name = user.name;
                    console.log(user.name);
                    console.log(name)
                }
            })
            setModalMsg(`Do you want to delete ${name} Data ?`);
        } else if(content.length >= 1) {
            setModalMsg(`Do you want to delete ${content.length} records ?`);
        }
    })
    return (
        <>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {modalMsg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="grey" onClick={() => close()} autoFocus>Cancel</Button>
                    <Button variant="contained" color="error" onClick={deleteData}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteModal;