import TextField from '@mui/material/TextField';

const Input = (props) => {
    let {variant, size, margin, label, name, type, width, value, onchange, errorValue, onleave, errMsg, row, multiline} = props;
    
    return(
        <>
            <TextField
                variant={variant}
                size={size}
                margin={margin}
                label={label}
                rows={row}
                multiline={multiline}
                type={type}
                name={name}
                value={value}
                sx={{ width: width }}
                onChange={(e) => {onchange(e)}}
                error={errorValue}
                onBlur={(e) => {onleave(e)}}
                helperText={errorValue && errMsg}
            >

            </TextField>
        </>
    )
}

export default Input;