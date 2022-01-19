import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import { ThemeProvider, createTheme } from '@mui/material/styles';

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// })

export default function FormUpdate({open, handleClose, data, onChange, handleFormUpdate, handleDeleteCohort, handleDeleteProduct, handleAddProduct}) {

const {_id, full_name, cohort, products} = data
    
  return (
    <div>
      {/* <ThemeProvider darkTheme={darkTheme}> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Update Application"}</DialogTitle>
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
                // value={cohort.name}
                onChange={e=>onChange(e)}
                placeholder="Cohort" 
                label="Cohort" 
                margin="dense" 
                fullWidth
                variant="standard"/>
                <Button onClick={() => handleDeleteCohort(data)}>Remove</Button>
            <TextField 
                id="products"
                value={products}
                onChange={e=>onChange(e)}
                placeholder="Product" 
                label="Product" 
                margin="dense" 
                fullWidth
                variant="standard"/>
                <Button onClick={() => handleDeleteProduct(data)}>Remove</Button>
                <Button onClick={() => handleAddProduct()}>Add</Button>
                {/* add new textfield for adding product */}
        </form>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleFormUpdate(data)}>{"Update"}</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* </ThemeProvider> */}
    </div>
  );
}