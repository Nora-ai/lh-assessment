import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormDialog from "./components/modal";
import FormUpdate from "./components/modalUpdateCohort";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";

const url = "http://localhost:3000/api/applications";

export const getStaticProps = async () => {
  const res = await fetch(url);
  const { data } = await res.json();

  return {
    props: { applications: data },
  };
};

const Index = ({ applications }) => {
  const [rowData, setRowData] = useState(applications);

  const [colDefs, setColDefs] = useState([
    { headerName: "Full name", field: "full_name" },
    { headerName: "Cohort", field: "cohort" },
    { headerName: "Products", field: "products" },
    {
      headerName: "Actions",
      field: "id",
      cellRendererFramework: (params) => (
        <div>
          <button onClick={() => handleUpdateCohort(params.data)}>Edit</button>
        </div>
      ),
    },
  ]);

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  //state for modal window
  const [open, setOpen] = useState(false);

  //state for adding new application
  const [formData, setFormData] = useState({
    full_name: "",
    cohort: "",
    products: [],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFormUpdate = (data) => {
    console.log(data);
    if (data._id) {
      fetch(`${url}/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res), handleClose();
        });
    }
  };

  const handleFormSubmit = () => {
    console.log(formData);
    const { full_name, cohort, products } = formData;
    const newForm = { full_name, cohort, products: [products] };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newForm),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res), handleClose();
      });
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onCellValueChanged = (event) => {
    console.log("Data after change is", event.data);
    fetch(`${url}/${event.data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event.data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handleUpdateCohort = (oldData) => {
    console.log(oldData);
    setFormData(oldData);
    handleClickOpen();
  };

  const handleDeleteCohort = (data) => {
    console.log(data);
    fetch(`${url}/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify((data.cohort = " ")),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res), handleClose();
      });
  };

  const handleDeleteProduct = (data) => {
    //handle an array of products
    //put request
  };

  //search
  const onFilterTextChange = (e) => {
    gridApi.setQuickFilter(e.target.value);
  };

  const searchDiv = {
    backgroundColor: "#f5eea8",
    padding: 5,
    display: "flex",
    justifyContent: "space-between"

  }

  const searchStyle = {
    width: "75%",
    borderRadius: 15,
    outline: 0,
    border: 'none'

  }

  return (
    <div className="ag-theme-balham-dark" style={{ height: 500, width: "85%", margin: "0 auto" }}>
      {/* <Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setFormData({ full_name: "", cohort: "", products: [] });
            handleClickOpen();
          }}
        >
          Add Application
        </Button>
      </Grid> */}

   
      <FormDialog
        open={open}
        handleClose={handleClose}
        data={formData}
        onChange={onChange}
        handleFormSubmit={handleFormSubmit}
      />
      <FormUpdate
        open={open}
        handleClose={handleClose}
        data={formData}
        onChange={onChange}
        handleFormUpdate={handleFormUpdate}
        handleDeleteCohort={handleDeleteCohort}
        handleDeleteProduct={handleDeleteProduct}
      />
      <div style={searchDiv}>
      <input type="search" style={searchStyle} placeholder="search" onChange={onFilterTextChange} />
      <button onClick={() => {
            setFormData({ full_name: "", cohort: "", products: [] });
            handleClickOpen();
          }}>
        Add Application
      </button>
      </div>
      <AgGridReact
        defaultColDef={{ editable: true, sortable: true, filterable: true }}
        pagination={true}
        rowData={rowData}
        columnDefs={colDefs}
        onGridReady={onGridReady}
        onCellValueChanged={onCellValueChanged}
      >
        <AgGridColumn
          headerName="Full Name"
          valueGetter={(params) => {
            return params.data.full_name;
          }}
          valueSetter={(params) => {
            let newVal = params.newValue;
            let valueChanged = params.data.full_name !== newVal;
            if (valueChanged) {
              params.data.full_name = newVal;
            }
            return valueChanged;
          }}
        />
      </AgGridReact>
    </div>
  );
};

export default Index;
