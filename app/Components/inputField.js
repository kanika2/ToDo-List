import TextField from '@material-ui/core/TextField';

export const InputField = () => {
    <TextField
        id="outlined-full-width"
        label="ToDo"
        style={{ margin: 8 }}
        placeholder="Enter your toDo assignment"
        // helperText="Full width!"
        fullWidth
        margin="normal"
        variant="outlined"
        InputLabelProps={{
            shrink: true,
        }}
    />
} 