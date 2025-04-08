import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import Swal from 'sweetalert2'; 

function FontGroupModal({ show, setShow, fonts, setFonts, group, setGroup, refreshFonts, isEdit, required, setRequired }) {
 
 
    const [loading, setLoading] = useState(false);
    const [fontData, setFontData] = useState([]);

    const handleClose = () => {
        setShow(false);
        setRequired([]);
    };

    useEffect(() => {
        fetchFonts();
    }, []);

    // console.log("fonts", fonts);

    const fetchFonts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost/font-group-system-backend/get-fonts');

            if (response?.data?.status === 'success') {
                setFontData(response?.data?.data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };


    const addRow = () => {
        setFonts(prevFonts => [
            ...prevFonts,
            { id: prevFonts.length, name: '', font_id: '' },
        ]);
    };


    const removeRow = (key) => {
        if (fonts.length === 2) return; 
        setFonts(fonts.filter((font, index) => index !== key));
    };


    const handleChange = (id, field, value) => {
        const updatedFonts = fonts.map((font, index) =>
            index === id ? { ...font, [field]: value } : font
        );
        setFonts(updatedFonts);
    };

    const handleValidation = () => {

        let isValid = true;
        let invalidIndex = [];

        if(!group.groupTitle) {
            invalidIndex.push({ index: 0, field: 'groupTitle' });
            isValid = false;
        }
    
        fonts.forEach((row, index) => {
          if (!row.name) {
            invalidIndex.push({ index, field: 'name' });
            isValid = false;
          }

          if (!row.font_id) {
            invalidIndex.push({ index, field: 'font_id' });
            isValid = false;
          }
        });
        setRequired(invalidIndex);
        return isValid;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (handleValidation()) {
            try {
                const data = {
                    fonts: fonts,
                    group_title: group?.groupTitle,
                }
    
                const response = await axios.post('http://localhost/font-group-system-backend/create-font-group', data);
        
                if (response?.data?.status === 'success') {
                   
                    setFonts([
                        { id: 0, name: '', font_id: '' },
                        { id: 1, name: '', font_id: '' },
                    ]);

                    setGroup({ id: 0, groupTitle: '' });
                    setShow(false); // Close modal
                    setRequired([]);
                    refreshFonts();
                    Swal.fire("Success", "Font group created successfully!", "success");
                } else {
                    Swal.fire("Error", response?.data?.message || "Failed to create font group.", "error");
                }
            } catch (error) {
                console.log(error);
                Swal.fire("Error", "Something went wrong!", "error");
            }
        } else {
            console.log("Validation failed required.");
        }
    };

    // console.log("group", group);

    const handleUpdate = async (e) => {

        e.preventDefault();
        if (handleValidation()) {
            try {
                const data = {
                    fonts: fonts,
                    group_id: group?.id,
                    group_title: group?.groupTitle,
                }

                const response = await axios.post('http://localhost/font-group-system-backend/update-font-group', data);
        
                if (response?.data?.status === 'success') {
                    setShow(false);
                    setRequired([]);
                    refreshFonts();
                    Swal.fire("Success", "Font group updated successfully!", "success");
                } else {
                    Swal.fire("Error", response?.data?.message || "Failed to update font group.", "error");
                }
            } catch (error) {
                console.log(error);
                Swal.fire("Error", "Something went wrong!", "error");
            }
        } else {
            console.log("Validation failed required.");
        }
    }

    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <div className="card">
                    <div className="card-header bg-primary text-white">
                        {
                            isEdit ? (
                                <h3> Update Font Group</h3>
                            ) : (
                                <h3> Create Font Group</h3>
                            )
                        }
                    </div>
                        <div className="card-body">
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    type="text" 
                                    placeholder="Group Title"  
                                    value={group?.groupTitle}  
                                    onChange={(e) => setGroup({ ...group, groupTitle: e.target.value })} 
                                    style={{
                                        borderColor: required.some(item => item.field === 'groupTitle') ? 'red' : '',
                                    }}
                                />
                            </Form.Group>
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th>Font Name</th>
                                    <th>Select a Font</th>
                                    {/* <th>Specific Size</th> */}
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {fonts.map((font, index) => (
                                    <tr key={index}>

                                    <td>
                                        <Form.Group className="mb-3">
                                            <Form.Control 
                                                type="text" 
                                                placeholder="name" 
                                                value={font.name}
                                                onChange={(e) => handleChange(index, "name", e.target.value)}
                                                style={{
                                                    borderColor: required.some(item => item.index === index && item.field === 'name') ? 'red' : '',
                                                }}
                                            />
                                        </Form.Group>

                                    </td>
                                    <td>
                                        <select 
                                            className="form-select" 
                                            value={font.font_id}
                                            onChange={(e) => handleChange(index, 'font_id', e.target.value)}
                                            style={{
                                                borderColor: required.some(item => item.index === index && item.field === 'font_id') ? 'red' : '',
                                            }}
                                        >
                                        <option value="">Select a font</option>
                                            {fontData.map((item, index) => (
                                                <option key={index} value={item.id}>{item.font_name}</option>
                                            ))}
                                        </select>
                                    </td>
                                    {/* <td>
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            value={font.size}
                                            onChange={(e) => handleChange(index, "size", e.target.value)}
                                        />
                                    </td> */}
                                    <td>
                                        <button 
                                            className="btn btn-outline-danger"
                                            onClick={() => removeRow(index)}
                                        >
                                            X
                                        </button>
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        
                        <div className="d-flex justify-content-between mt-3">
                            <button className="btn btn-primary" onClick={addRow}>
                                Add Row
                            </button>
                            {
                                isEdit ? (
                                    <button className="btn btn-success" onClick={handleUpdate}>
                                        Update
                                    </button>
                                ) : (
                                    <button className="btn btn-success" onClick={handleSubmit}>
                                        Create
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default FontGroupModal;
