
import React, { useEffect, useState} from "react";
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() =>{
        fetchCustomers();
    }, [])

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    //delete customer
    const deleteCustomer = (url) => {
        console.log(url);
        if (window.confirm('Are you sure?')) {
            fetch(url, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    fetchCustomers();
                }
                else {
                    alert('Something went wrong');
                }
            })
            .catch(err => console.error(err))
        }
    }
    //delete customer

    //add customer
    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: { 'Content-type' : 'application/json' },
            body: JSON.stringify(customer)
        })
        .then(response => {
            if(response.ok) {
                fetchCustomers();
            }
            else {
                alert('New customer could not be created')
            }
        })
        .catch(err => console.error(err))
    }
    //add customer

    //update customer
    const updateCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updatedCustomer)
        })
        .then(response =>{
            if(response.ok) {
                fetchCustomers();
                setMsg('Customer edited successfully');
                setOpen(true);
            }
            else {
                alert('Customer info could not be edited');
            }
        })
        .catch(err => console.error(err))
    }
    //update customer

    const columns = [
        {headerName: 'First name', field: 'firstname', sortable: true, filter: true},
        {headerName: 'Last name', field: 'lastname', sortable: true, filter: true},
        {headerName: 'Street address', field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {
            headerName: '',
            field: 'links.0.href',
            width: 150,
            cellRendererFramework: params => <EditCustomer updateCustomer={updateCustomer} params={params} />
        },
        {
            headerName: ' ',
            field: 'links.0.href',
            width: 120,
            cellRendererFramework: params =>
            <Button size="small"
            onClick={() => deleteCustomer(params.value)}
            color="error">
                Delete
            </Button>
        }
    ]

    return(
        <React.Fragment>
            <AddCustomer addCustomer={addCustomer} />
            <div className="ag-theme-material" style={{height: 400, width: '80%', margin: 'auto', textAlign: 'left'}}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={7}
                />            
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={msg}
            />
        </React.Fragment>
    );
}

export default Customerlist;