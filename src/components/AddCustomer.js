import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function AddCustomer(props) {
    const [open, setOpen] = useState(false);
    //oliostate:
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: '',
    })

   // {headerName: 'First name', field: 'firstname', sortable: true, filter: true},
   // {headerName: 'Last name', field: 'lastname', sortable: true, filter: true},
   // {headerName: 'Street address', field: 'streetaddress', sortable: true, filter: true},
   // {field: 'postcode', sortable: true, filter: true},
   // {field: 'city', sortable: true, filter: true},
   // {field: 'email', sortable: true, filter: true},
   // {field: 'phone', sortable: true, filter: true},


    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSave = () => {
     //   if (customer.phone.isnumber tms) voi tutkia inputtia ja tehdä validointia tässä
        props.addCustomer(customer);
        handleClose();
    }

    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name] : event.target.value})
    }
  
    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add customer
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Customer</DialogTitle>
          <DialogContent>

            <TextField
              name="firstname"
              value={customer.firstname}
              onChange={inputChanged}
              margin="dense"
              label="First name"
              fullWidth
              variant="standard"
            />
            <TextField
              name="lastname"
              value={customer.lastname}
              onChange={inputChanged}
              margin="dense"
              label="Last name"
              fullWidth
              variant="standard"
            />
            <TextField
              name="streetaddress"
              value={customer.streetaddress}
              onChange={inputChanged}
              margin="dense"
              label="Street address"
              fullWidth
              variant="standard"
            />
            <TextField
              name="postcode"
              value={customer.postcode}
              onChange={inputChanged}
              margin="dense"
              label="Postcode"
              fullWidth
              variant="standard"
            />
            <TextField
              name="city"
              value={customer.city}
              onChange={inputChanged}
              margin="dense"
              label="City"
              fullWidth
              variant="standard"
            />
            <TextField
              name="email"
              value={customer.email}
              onChange={inputChanged}
              margin="dense"
              label="Email"
              fullWidth
              variant="standard"
            />
            <TextField
              name="phone"
              value={customer.phone}
              onChange={inputChanged}
              margin="dense"
              label="Phone"
              fullWidth
              variant="standard"
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
    
}

export default AddCustomer;