import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import Swal from 'sweetalert2'; 

function FontGroupModal({ show, setShow }) {
 
    const handleClose = () => {
        setShow(false);
    };
    const [groupTitle, setGroupTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [fonts, setFonts] = useState([
        { id: 0, name: '', font_id: '', size: 0 },
    ]);

    const [fontData, setFontData] = useState([]);

    useEffect(() => {
        fetchFonts();
    }, []);

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

    // console.log("fonts", fonts);
   

    const addRow = () => {
        setFonts(prevFonts => [
            ...prevFonts,
            { id: prevFonts.length, name: '', font_id: '', size: 0 } 
        ]);
    };
    

    const removeRow = (id) => {
        if (fonts.length === 1) return; 
        setFonts(fonts.filter((font, index) => index !== id)); // Remove the row by ID
    };


    const handleChange = (id, field, value) => {
        const updatedFonts = fonts.map((font, index) =>
            index === id ? { ...font, [field]: value } : font
        );
        setFonts(updatedFonts);
    };


    const handleSubmit = async () => {
        
        try {
            const data = {
                fonts: fonts,
                group_title: groupTitle,
            }

            console.log("data", data);

            const response = await axios.post('http://localhost/font-group-system-backend/create-font-group', data);
    
            if (response?.data?.status === 'success') {
               
                setFonts([{ 
                    id: 0, 
                    name: '', 
                    font_id: '', 
                    size: 0 }]
                ); 
                setGroupTitle('');
                setShow(false); // Close modal
                Swal.fire("Success", "Font group created successfully!", "success");
            } else {
                Swal.fire("Error", response?.data?.message || "Failed to create font group.", "error");
            }
        } catch (error) {
            console.log(error);
            Swal.fire("Error", "Something went wrong!", "error");
        }
    };
    
    

    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <div className="card">
                    <div className="card-header bg-primary text-white">
                        <h3> Create Font Group</h3>
                        </div>
                        <div className="card-body">
                            <Form.Group className="mb-3">
                                <Form.Control type="text" placeholder="Group Title"  value={groupTitle}  onChange={(e) => setGroupTitle(e.target.value)} />
                            </Form.Group>
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th>Font Name</th>
                                    <th>Select a Font</th>
                                    <th>Specific Size</th>
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
                                            />
                                        </Form.Group>

                                    </td>
                                    <td>
                                        <select 
                                        className="form-select" 
                                        value={font.font_id}
                                        onChange={(e) => handleChange(index, 'font_id', e.target.value)}
                                        >
                                        <option value="">Select a font</option>
                                            {fontData.map((item, index) => (
                                                <option key={index} value={item.id}>{item.font_name}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            value={font.size}
                                            onChange={(e) => handleChange(index, "size", e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <button 
                                            className="btn btn-outline-danger"
                                            onClick={() => removeRow(font.id)}
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
                            <button className="btn btn-success" onClick={handleSubmit}>
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default FontGroupModal;
