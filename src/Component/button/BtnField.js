import Button from "@mui/material/Button";

const BtnField = (props) => {
    let { text, variant, handleClick, color, size, type } = props;

    return (
        <>
            <Button
                variant={variant} 
                onClick={handleClick} 
                color={color} 
                size={size}
                type={type}
                sx={{ marginLeft : 1}}
            >
                {text}
            </Button>
        </>
    )
}

export default BtnField;