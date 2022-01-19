import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
//import { ThemeProvider, createTheme } from '@material-ui/core';

export default function FormDialog({open, handleClose, data, onChange, handleFormSubmit}) {

const {_id, full_name, cohort, products} = data

// const theme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// })
     
  return (
    <div>
      {/* <ThemeProvider theme={theme}> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Create new application"}</DialogTitle>
        <DialogContent>
          <form>
            <TextField 
                id="full_name"
                value={full_name}
                onChange={e=>onChange(e)}
                placeholder="Full Name" 
                label="Full Name" 
                margin="dense" 
                fullWidth
                variant="standard"/>
            <TextField 
                id="cohort" 
                value={cohort}
                onChange={e=>onChange(e)}
                placeholder="Cohort" 
                required
                label="Cohort" 
                margin="dense" 
                fullWidth
                variant="standard"/>
            <TextField 
                id="products"
                value={products}
                onChange={e=>onChange(e)}
                placeholder="Product"
                required 
                label="Product" 
                margin="dense" 
                fullWidth
                variant="standard"/>
        </form>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleFormSubmit(data)}>{"Submit"}</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* </ThemeProvider> */}
    </div>
  );
}