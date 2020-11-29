import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function AddCar(props) {

    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        price: '',
        year: ''
    });

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const inputChanged = (event) => {
        setCar({...car, [event.target.name]: event.target.value})
    }

    const handleSave = () => {
    props.addCar(car);
    handleClose();
    }
  
    return(
        <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Add Car
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Car</DialogTitle>
          <DialogContent>
           
            <TextField
              name="brand"
              value={car.brand}
              onChange={inputChanged}
              margin="dense"
              label="Model"
              type="email"
              fullWidth
            />
            <TextField
              name="model"
              value={car.model}
              onChange={inputChanged}
              margin="dense"
              label="Model"
              type="email"
              fullWidth
            />
            <TextField
              name="color"
              value={car.color}
              onChange={inputChanged}
              margin="dense"
              label="Color"
              type="email"
              fullWidth
            />
            <TextField
              name="fuel"
              value={car.fuel}
              onChange={inputChanged}
              margin="dense"
              label="Fuel"
              type="email"
              fullWidth
            />
            <TextField
              name="year"
              value={car.year}
              onChange={inputChanged}
              margin="dense"
              label="Year"
              type="email"
              fullWidth
            />
            <TextField
              name="price"
              value={car.price}
              onChange={inputChanged}
              margin="dense"
              label="Price"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>

    )
}

export default AddCar;