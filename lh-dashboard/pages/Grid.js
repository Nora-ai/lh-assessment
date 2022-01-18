// import React, { useState } from 'react'
// import { AgGridColumn, AgGridReact } from 'ag-grid-react'

// import 'ag-grid-community/dist/styles/ag-grid.css'
// import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css'

// const InitialRowData = [
//     {full_name: "user1", cohort: "cohort1", product: "product1"},
//     {full_name: "user2", cohort: "cohort2", product: "product1"},
//     {full_name: "user3", cohort: "cohort3", product: "product1"}
// ]

// const Grid = () => {

//     const [rowData, setRowData] = useState(InitialRowData)

//     //React.useEffect(())

//     return (
//         <div className="ag-theme-balham" style={{height:400, width:600}}>
//             <AgGridReact
//                 defaultColDef={{editable: true, sortable: true, filterable: true}}
//                 pagination={true}
//                 rowData = {rowData}
//                 >
//                 <AgGridColumn field="full_name"></AgGridColumn>
//                 <AgGridColumn field="cohort"></AgGridColumn>
//                 <AgGridColumn field="product"></AgGridColumn>
//             </AgGridReact>
//         </div>
//     )
// }

// export default Grid