import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({open, handleClose, data, onChange, handleFormSubmit}) {

const {_id, full_name, cohort, products} = data
     
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{_id ? "Update Cohort" : "Create new application"}</DialogTitle>
        <DialogContent>
          <form>
            <TextField 
                id="full_name"
                value={full_name}
                onChange={e=>onChange(e)}
                placeholder="Full Name" 
                label="Full Name" 
                margin="dense" 
                fullWidth/>
            <TextField 
                id="cohort" 
                value={cohort}
                onChange={e=>onChange(e)}
                placeholder="Cohort" 
                label="Cohort" 
                margin="dense" 
                fullWidth/>
            <TextField 
                id="products"
                value={products}
                onChange={e=>onChange(e)}
                placeholder="Product" 
                label="Product" 
                margin="dense" 
                fullWidth/>
        </form>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleFormSubmit(data)}>{_id ? "Update": "Submit"}</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}