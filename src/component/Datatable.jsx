import React, { useState } from 'react';
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import CustomModal from './CustomModal';


const DataTable = ({data}) => {
    return (
        <>
        <CDBCard>
            <CDBCardBody>
                <CDBDataTable
                    striped
                    bordered
                    hover
                    entriesOptions={[5, 20, 25]}
                    entries={5}
                    pagesAmount={4}
                    data={data()}
                    materialSearch={true}
                />
            </CDBCardBody>
        </CDBCard>
        </>
    );
};

export default DataTable;