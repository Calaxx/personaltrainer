import React, { useEffect, useState} from "react";
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
//import Snackbar from '@mui/material/Snackbar';
//import AddTraining from './AddTraining';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
//import { linkClasses } from "@mui/material";

function Traininglist() {
    const [trainings, setTrainings] = useState([]);
//    const [open, setOpen] = useState(false);
//    const [msg, setMsg] = useState('');

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

    //delete training
    const deleteTraining = (trainingid) => {   
        console.log(trainingid);
        if (window.confirm('Are you sure?')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + trainingid, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    fetchTrainings();
                }
                else {
                    alert('Training could not be deleted');
                }
            })
            .catch(err => console.error(err))
        }
    }
    //delete training

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

       // tässä treeni haetaan id:lla ja passataan deletetrainingin urliin
       {
            headerName: ' ',
            field: 'id',
            width: 120,
            cellRendererFramework: params =>
            <Button size="small" 
            onClick={() => deleteTraining(params.value)}
            color="error">
                Delete
            </Button>
       }
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