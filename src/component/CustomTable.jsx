import React from 'react';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Swal from 'sweetalert2';



const CustomTable = ({data, setFonts, refreshFonts}) => {

    const handleDelete = async (fontId) => {
        console.log("fontId", fontId);
        try {
            // Show confirmation modal
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // Make the API request to delete the font
                    const response = await axios.post('http://localhost/font-group-system/delete-font', 
                    { 
                        font_id: fontId 
                    }, 
                    {
                        headers: {
                            'Content-Type': 'application/json' // Ensure JSON content type is set
                        }
                    });
    
                    if (response.data.status === 'success') {
                        setFonts((prevData) => prevData.filter((item) => item.id !== fontId));
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
    
    
    
    return (
        <div>
            <Table responsive="md">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Font Name</th>
                        <th>Preview</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.font_name}</td>
                                <td>
                                    <div>
                                        <style>
                                            {`
                                                @font-face {
                                                    font-family: '${item.font_name}';
                                                    src: url('http://localhost/font-group-system/uploads/${item.file_path}') format('truetype');
                                                }
                                                .font-preview-${index} {
                                                    font-family: '${item.font_name}';
                                                }
                                            `}
                                        </style>
                                        <p className={`font-preview-${index}`}> {item.font_name}</p>
                                    </div>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default CustomTable;