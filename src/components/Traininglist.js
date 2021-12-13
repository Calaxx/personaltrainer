import React, { useEffect, useState} from "react";
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
//import AddCar from './AddCar';
//import EditCar from './EditCar';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() =>{
        fetchTrainings();
    }, [])

    const fetchTrainings = () => {
       // fetch('https://customerrest.herokuapp.com/api/trainings')
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const columns = [
        {field: 'date', sortable: true, filter: true},
        {field: 'duration', sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true},
        {headerName: 'Customer', field: 'Fullname', valueGetter(params) {
            return params.data.customer.firstname + ' ' + params.data.customer.lastname
            }, suppressMenu: true, 
        },
       // {field: 'customer.firstname', sortable: true, filter: true},
       // {field: 'customer.lastname', sortable: true, filter: true},
        //{field: 'content', sortable: true, filter: true},
    ]

    return(
        <div className="ag-theme-material" style={{height: 400, width: '80%', margin: 'auto', textAlign: 'left'}}>
            <AgGridReact
                rowData={trainings}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={7}
            />            
        </div>
    );
}

export default Traininglist;