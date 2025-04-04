import { useEffect, useState } from "react";
import DataTable from "../component/Datatable";
import DashboardLayout from "../component/HOC/DashboardLayout";
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import CustomModal from "../component/CustomModal";
import { Button } from "react-bootstrap";
import axios from "axios";

const Home = () => {

    const [show, setShow] = useState(false);
    const [tableData, setTableData] = useState([]);

    

    const data = () => {
        return {
            columns: [
                {
                label: 'Font Name',
                field: 'name',
                width: 150,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Name',
                },
                },
                {
                label: 'Preview',
                field: 'preview',
                width: 270,
                },

                {
                label: 'Actions',
                field: 'actions',
                sort: 'asc',
                width: 100,

                    getActions: (data) => {
                        return (
                            <>
                                <button>Delete</button>
                            </>
                        )
                    }

                }
            ],
            
            rows: tableData.map((item) => ({
                ...item,
                actions: (
                    <>
                        <button>Delete</button>
                    </>
                )
            }))
        };
    };
    

    return (
        <DashboardLayout>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                <h1>Font List</h1>

                <Button onClick={() => setShow(true)}>Add Font</Button>
            </div>
            
            <CustomModal
                show={show}
                setShow={setShow}
            />
            <div className="">
                <DataTable
                    data={data}
                />
            </div>
        </DashboardLayout>
    )
}

export default Home;