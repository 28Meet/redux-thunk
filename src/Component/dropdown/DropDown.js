import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const DropDown = (props) => {
    let { label, size, onChange, name, value, error, onblur, items, selected } = props;
    return (
        <>
            <Select sx={{ textAlign : 'left', width : 350}} label="City*" size={size} onChange={(e) => onChange(e)} name={name} value={value} error={error} onBlur={(e) => onblur(e)} defaultValue={selected}>
                    {
                        items.map(item => {
                            return(
                                <MenuItem value={item} key={item}>{item}</MenuItem>
                            )
                        })
                    }
            </Select>
        </>
    )
}

export default DropDown;