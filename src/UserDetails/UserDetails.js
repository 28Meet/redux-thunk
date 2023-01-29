import React, { useState, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchUser } from '../features/userSlice';
import DataTable from './DataTable';
import Form from "../Form/Form";
import CircularProgress from '@mui/material/CircularProgress';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Paper, Container, Box, InputAdornment, TextField, Tooltip, IconButton, Checkbox } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const UserDetails = () => {
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  let dispatch = useDispatch();
  const [record, setRecord] = useState([]);
  const [select, setSelect] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  const [msg, setMsg] = useState("Data Added Successfully");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarVariant, setSnackbarVariant] = useState('success');
  let rows = new Array();
  rows = useSelector(state => state.user.users);

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }

  const mainStyle = {
    zIndex: 1,
    margin: 3,
    padding: 1
  }

  const parentStyle = {
    filter: "blur(1px)",
    pointerEvents: "none"
  }

  const addUser = () => { setOpenForm(true) }
  const closeForm = () => { setOpenForm(false) }
  const setUserUpdateId = (id) => { setUpdateId(id); setOpenForm(true); }
  const resetUpdateId = () => { setUpdateId(0) }
  const openModal = (msg, variant) => { setMsg(msg); setSnackbarVariant(variant); setOpenSnackbar(true)}

  useEffect(() => { dispatch(fetchUsers()) }, [openForm])

  return (
    <>
      <Paper sx={(openForm) ? parentStyle : mainStyle}>
        <Container sx={headerStyle}>
          <Box sx={{ display: "flex", flex: "30%", justifyContent: "flex-start" }}>
            <h3>User Details</h3>
          </Box>

          <Tooltip title="Add User" sx={{ flex: "20%" }}>
            <IconButton onClick={addUser}>
              <PersonAddIcon sx={{ cursor: "pointer" }} />
            </IconButton>
          </Tooltip>
        </Container>
        <DataTable setId={setUserUpdateId} rows={rows} openModal={openModal} />
        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
          <Alert severity={snackbarVariant} sx={{ width: '100%' }}>
            {`${msg}`}
          </Alert>
        </Snackbar>
      </Paper>
      {
        (openForm && <Form close={closeForm} editId={updateId} resetId={resetUpdateId} openModal={openModal} />)
      }

    </>
  )
}

export default UserDetails