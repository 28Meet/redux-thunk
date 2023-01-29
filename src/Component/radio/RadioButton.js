import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const RadioButton = (props) => {

    let { value, label, name, onClick } = props;
    return (
        <>
            <FormControlLabel control={<Radio />} value={value} label={label} name={name} onClick={onClick} />
        </>
    )
}

export default RadioButton;