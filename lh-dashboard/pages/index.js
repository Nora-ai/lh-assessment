import React, { useState } from 'react'
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import FormDialog from './components/modal'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css'
import { FormControlUnstyledContext } from '@mui/material'

const url = 'http://localhost:3000/api/applications'

export const getStaticProps = async () => {
  const res = await fetch(url)
  const { data } = await res.json()

  return {
      props: { applications: data }
  }
}

const Index = ({ applications }) => {
  //console.log(applications)

  const [rowData, setRowData] = useState(applications)

  const [colDefs, setColDefs] = useState([
    {headerName: "Full name", field: "full_name"},
    {headerName: "Cohort", field: "cohort"},
    {headerName: "Cohort Actions", field: "id", cellRendererFramework:(params)=>
    <div>
      <button onClick={()=>handleUpdateCohort(params.data)}>Edit</button>
      <button onClick={()=>handleDeleteCohort(params.data)}>Remove</button>
    </div>},
    {headerName: "Products", field: "products"},
    {headerName: "Product Actions", field: "id", cellRendererFramework:(params)=>
    <div>
      <button onClick={()=>handleUpdateProduct(params.data)}>Edit</button>
    </div>}
  ])

  const [gridApi, setGridApi] = useState(null)
  const [gridColumnApi, setGridColumnApi] = useState(null)

  //state for modal window
  const [open, setOpen] = useState(false);

  //state for adding new application 
  const [formData, setFormData] = useState({full_name: "", cohort: "", products:[]})

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange=(e)=> {
    const { value, id } = e.target
    setFormData({...formData, [id]: value})
  }

  const handleFormSubmit=(data)=> {
    console.log(data)
    if (data._id) {
      fetch(`${url}/${data._id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({formData})
      }).then(res => res.json())
      .then(res => {
        console.log(res),
        handleClose()
      })
    } else {
      console.log(formData)
      //61e098eeb9ba00b49585b781 cohort
      //61e0997ae6d1637f5dce26c7 product
      const { full_name, cohort, products } = formData
      const newForm = {full_name, cohort, products: [products]}
    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newForm)
    }).then(res => res.json())
    .then(res => {
      console.log(res),
      handleClose()
    })}
  }


  const onGridReady = (params) => {
    setGridApi(params)
    setGridColumnApi(params.columnApi)
  }

  const onCellValueChanged = (event) => {
    console.log('Data after change is', event.data)
    fetch(`${url}/${event.data._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event.data)
    }).then(res => res.json())
    .then(data => console.log(data))
  }

const handleUpdateCohort = (oldData) => {
  console.log(oldData)
  setFormData(oldData)
  handleClickOpen()
}

const handleDeleteCohort = (oldData) => {
  console.log(oldData.cohort)
  //set cohort to empty string
}


  return (
      <div className="ag-theme-balham-dark" style={{height:400, width:600}}>
        <Grid>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={()=>{
              setFormData({full_name: "", cohort: "", products:[]})
              handleClickOpen()}}>Add Application</Button>
        </Grid>
        <FormDialog open={open} handleClose={handleClose} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
          <AgGridReact
              defaultColDef={{editable: true, sortable: true, filterable: true}}
              pagination={true}
              rowData={rowData}
              columnDefs={colDefs}
              onGridReady={onGridReady}
              onCellValueChanged={onCellValueChanged}
              >
                <AgGridColumn 
                  headerName="Full Name"
                  valueGetter={(params) => {
                    return params.data.full_name
                  }}
                  valueSetter={(params) => {
                    let newVal = params.newValue
                    let valueChanged = params.data.full_name !== newVal
                    if (valueChanged) {
                      params.data.full_name = newVal
                    }
                    return valueChanged
                  }}
                
                
                />

          </AgGridReact>
      </div>
    )

}

export default Index