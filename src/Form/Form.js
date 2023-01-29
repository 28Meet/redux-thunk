import { useEffect, useState } from "react";
import { createUser, fetchUser, updateUser, fetchUsers } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from '@reduxjs/toolkit'
import { Paper, FormControl, Box, Tooltip, IconButton, FormLabel, RadioGroup, FormHelperText, InputLabel, FormControlLabel, Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Input from "../Component/Input/Input";
import RadioButton from '../Component/radio/RadioButton';
import DropDown from '../Component/dropdown/DropDown';
import BtnField from "../Component/button/BtnField";
import { CITY, INITAL_STATE, ERROR_STATE } from '../constant/Constant';
import { LocationCityTwoTone } from "@mui/icons-material";

const Form = (props) => {
    let { close, editId, resetId, openModal } = props;
    // console.log(editId)
    let record = useSelector(state => state.user.editUser);
    // console.log(record)
    const dispatch = useDispatch();
    const [data, setData] = useState(INITAL_STATE);
    const [error, setError] = useState(ERROR_STATE);
    const [isUpdate, setIsUpdate] = useState(false);
    let { name, address, mail, mobile, gender, city } = data;
    let { nameError, addressError, mailError, mobileError, genderError, cityError } = error;

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setError({ ...error, [`${e.target.name}Error`]: false });
    }

    const handleError = (e) => {
        ([e.target.value] == "" && setError({ ...error, [`${e.target.name}Error`]: true }));
    }

    const reset = () => {
        setData(INITAL_STATE);
        setError(ERROR_STATE);
    }

    const handleSubmit = () => {
        if (name == "" && address == "" && mail == "" && mobile == "" && city == "" && gender == "") {
            setError({
                nameError: true,
                addressError: true,
                mailError: true,
                mobileError: true,
                genderError: true,
                cityError: true
            })
        } else if (name == "") {
            setError({ ...error, nameError: true });
        } else if (address == "") {
            setError({ ...error, addressError: true });
        } else if (mail == "") {
            setError({ ...error, mailError: true });
        } else if (mobile == "") {
            setError({ ...error, mobileError: true });
        } else if (gender == "") {
            setError({ ...error, genderError: true });
        } else if (city == "") {
            setError({ ...error, cityError: true });
        } else {
            if (isUpdate) {
                dispatch(updateUser(data));
                resetId();
                setIsUpdate(false);
                openModal("Data Updated Successfully", "info")
            } else {
                dispatch(createUser(data));
                openModal("Data Added Successfully", "success")
            }
            close();
            dispatch(fetchUsers());
        }
    }

    const parentStyle = {
        boxShadow: "0px 2px 2px grey",
        borderRadius: 3,
        width: 500,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        padding: 1
    }

    const mainContainer = {
        zIndex: 2,
        width: 520,
        position: "absolute",
        top: 3,
        left: 400
    }

    const closeBtnStyle = {
        cursor: "pointer",
        position: 'relative',
        top: -60,
        right: -190
    }

    const getById = async () => {
        try{
            const resultAction = await dispatch(fetchUser(editId))
            const result = unwrapResult(resultAction)
            
            setData(result);
        }catch(rejectedValueOrSerializedError){
            console.log(rejectedValueOrSerializedError);
        }
    
    }

    useEffect(() => {
        if (editId != 0) {
            getById();
            setIsUpdate(true);
        }
    }, [editId])

    return (
        <>
            <Paper sx={mainContainer}>
                <FormControl sx={parentStyle}>
                    <Box>
                        <h2>Registration Form</h2>
                        <Box sx={closeBtnStyle}>
                            <Tooltip title="close">
                                <IconButton onClick={close}>
                                    <CloseIcon sx={{ cursor: "pointer" }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>

                    <FormControl>
                        <Input variant="outlined" size="small" margin="none" label="Name*" type="text" name="name" value={name} width={350} errorValue={nameError} onchange={handleChange} onleave={handleError} errMsg="Please enter your name" row={1} multiline={false} />
                    </FormControl>

                    <FormControl>
                        <Input variant="outlined" size="large" margin="normal" label="Address*" type="text" name="address" value={address} width={350} errorValue={addressError} errMsg="Please enter your address" row={3} multiline={true} onchange={handleChange} onleave={handleError} />
                    </FormControl>

                    <FormControl>
                        <Input variant="outlined" size="small" margin="none" label="Email*" type="mail" name="mail" value={mail} width={350} errorValue={mailError} errMsg="Please enter your email" row={1} multiline={false} onchange={handleChange} onleave={handleError} />
                    </FormControl>

                    <FormControl>
                        <Input variant="outlined" size="small" margin="normal" label="Mobile*" type="text" name="mobile" value={mobile} width={350} errorValue={mobileError} errMsg="Please enter your mobile number" row={1} multiline={false} onchange={handleChange} onleave={handleError} />
                    </FormControl>

                    <FormControl>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginRight: 11 }}>
                            <FormLabel>Gender* :</FormLabel>
                            <RadioGroup value={gender} row sx={{ paddingLeft: 1 }} defaultValue={isUpdate && gender}>
                                <RadioButton value="Male" label="Male" name="gender" onClick={(e) => setData({ ...data, [e.target.name]: e.target.value })} />
                                <RadioButton value="Female" label="Female" name="gender" onClick={(e) => setData({ ...data, [e.target.name]: e.target.value })} />
                            </RadioGroup>
                        </Box>
                        {
                            (genderError && <FormHelperText sx={{ color: "red" }}> Please select gender</FormHelperText>)
                        }
                    </FormControl>

                    <FormControl>
                        <InputLabel>City*</InputLabel>
                        <DropDown
                            label="City*"
                            size="small"
                            name="city"
                            value={city}
                            error={cityError}
                            items={CITY}
                            onChange={handleChange}
                            onblur={handleError}
                            selected={isUpdate && city}
                        />
                        {
                            (cityError && <FormHelperText sx={{ color: "red" }}> Please select city</FormHelperText>)
                        }
                    </FormControl>

                    <FormControl>
                        <Box>
                            <FormControlLabel control={<Checkbox />} />
                            <FormLabel>
                                I have read and understand company <a href="#">terms</a> and <a href="#">conditions</a>.
                            </FormLabel>
                        </Box>
                    </FormControl>

                    <FormControl>
                        <Box>
                            <BtnField text={"Sign Up"} variant="contained" color="primary" size="medium" type="submit" handleClick={handleSubmit} />

                            <BtnField text="Reset" variant="contained" color="secondary" size="medium" type="reset" handleClick={reset} />
                        </Box>
                    </FormControl>
                </FormControl>
            </Paper>
        </>
    )
}

export default Form;