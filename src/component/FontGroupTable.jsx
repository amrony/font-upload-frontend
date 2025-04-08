import React from 'react';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Swal from 'sweetalert2';

const FontGroupTable = ({data, refreshFonts, show, setShow, fonts, setFonts, group, setGroup, setIsEdit}) => {

    const handleDelete = async (fontGroupId) => {
        console.log("fontId", fontGroupId);
        try {
            // Show confirmation modal
            Swal.fire({
                title: "Are you sure?",
                text: "You want to delete this font group?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // Make the API request to delete the font
                    const response = await axios.post('http://localhost/font-group-system-backend/delete-font-group', 
                    { 
                        font_group_id: fontGroupId 
                    }, 
                    {
                        headers: {
                            'Content-Type': 'application/json' 
                        }
                    });
    
                    if (response.data.status === 'success') {
                        refreshFonts(); 
                        Swal.fire({
                            text: "Font Deleted Successfully",
                            icon: "success"
                        });
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'Error deleting font',
                            icon: 'error'
                        });
                    }
                }
            });
        } catch (error) {
            console.error('Error deleting font', error);
            Swal.fire({
                title: 'Error',
                text: 'An error occurred while deleting the font.',
                icon: 'error'
            });
        }
    };

    const handleEdit = async (fontGroupId) => {
        setShow(true);
        setIsEdit(true);
        await getFontGroupById(fontGroupId);

    }

    const getFontGroupById = async (fontGroupId) => {
        try {
            const response = await axios.get('http://localhost/font-group-system-backend/get-font-group-by-id', {
                params: {
                    font_group_id: fontGroupId
                }
            });

            console.log("response", response);
    
            // Handle the response
            if (response?.data?.status === 'success') {
                let parseData =  JSON.parse(response?.data?.data);
                setGroup({ id: parseData?.group_id, groupTitle: parseData?.group_title });
                setFonts(parseData?.fonts);
            } else {
                console.log("Failed to fetch font group:", response?.data?.message);
            }
        } catch (err) {
            console.log("Error fetching font group:", err);
        }
    };
    
    
    
    return (
        <div>
            <Table responsive="md">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Fonts</th>
                        <th>Count</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.group_title}</td>
                                <td>
                                    {item.fonts.map((font, index) => (
                                        <div key={index}>
                                            {font.name}
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    {item.fonts.length}
                                </td>
                                
                                <td>
                                    <button onClick={() => handleEdit(item.group_id)}>Edit</button>
                                    <button onClick={() => handleDelete(item.group_id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default FontGroupTable;