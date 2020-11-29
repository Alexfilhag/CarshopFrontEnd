import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
 
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/snackbar';
import AddCar from './AddCar';
import EditCar from './EditCar';


function Carlist () {

 const [cars, setCars] = useState([]);
 const [open, setOpen] = useState(false);
 const [msg, setMsg] = useState("");

 const gridRef = useRef();


 const columns = [
    {headerName: 'Brand', field: 'brand', sortable: true, filter: true},
    {headerName: 'Model', field: 'model', sortable: true, filter: true},
    {headerName: 'Color', field: 'color', sortable: true, filter: true},
    {headerName: 'Fuel', field: 'fuel', sortable: true, filter: true},
    {headerName: 'Year', field: 'year', sortable: true, filter: true},
    {headerName: 'Price', field: 'price', sortable: true, filter: true, width: 120},
    {
      headerName: '',
      width: 80,
      field: '_links.self.href',
      cellRendererFramework: params => <EditCar
       updateCar={updateCar} params={params} />
    },
    {headerName: '',
     field:'_links.self.href',
     cellRendererFramework: params => <Button
      color="secondary" size="small" onClick={() => deleteCar(params.value)}>Delete
      </Button> 
    }
]



 const getCars = () => {
     fetch('https://carstockrest.herokuapp.com/cars')
     .then(response => response.json())
     .then(data => setCars(data._embedded.cars))
     .then(_=> setMsg("Car was edited succesfully"))
     .then(_=> setOpen(true))
     .catch(err => console.error(err))
 }




 const deleteCar = (link) => {
     if(window.confirm('Are you sure?')) {
    fetch(link, {
        method: 'DELETE'
    })
    .then(_=> gridRef.current.refreshCells({rowNodes: getCars()})) 
    .then(_=> setMsg("Car was deleted succesfully"))
    .then(_=> setOpen(true))
    .catch(err => console.error(err));
 }
}


 {/*or just use getCars() aka .then(_=> getCars()) */}

 useEffect(() => {
  getCars();
 }, [])



 const handleClose = () => {
     setOpen(false);
 }



 const updateCar = (link, car) => {
    fetch(link, {
        method: 'PUT', 
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(car)
    })
    .then(_=> getCars())  
    .then(_=> setMsg("Car is edited succefully!"))
    .catch(err => console.error(err))
  }



 const addCar = (newCar) => {
   fetch('https://carstockrest.herokuapp.com/cars', {
       method: 'POST', 
       headers: {'Content-type': 'application/json'},
       body: JSON.stringify(newCar)
   })
   .then(_=> getCars())  
   .then(_=> setMsg("Car is added succefully!"))
   .then(_=> setOpen(true))
   .catch(err => console.error(err))
 }



 return(
     <div>
         <AddCar addCar={addCar}
         
         />
     <div className = "ag-theme-material" style = {{height: '700px', width: '70%', margin: 'auto'}}>
         <AgGridReact
             ref = {gridRef}
             onGridReady = {params => {
                 gridRef.current = params.api
             }}
             suppressCellSelection={true} 
             columnDefs = {columns}
             rowData = {cars}
             pagination = {true}
             paginationPageSize = {10} >

         </AgGridReact>
         <Snackbar
             open={open}
             autoHideDuration={3000}
             onClose={handleClose}
             message={msg}
        />
     </div>
     </div>
 )
}

export default Carlist;