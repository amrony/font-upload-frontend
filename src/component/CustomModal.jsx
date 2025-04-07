import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import Swal from 'sweetalert2'; 

function CustomModal({ show, setShow, refreshFonts }) {
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleClose = () => {
    setShow(false);
    setUploadMessage("");
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    // Validate .ttf extension
    if (file.type !== 'font/ttf' && !file.name.endsWith('.ttf')) {
      setUploadMessage('Only TTF files are allowed');
      return;
    }
  
    const formData = new FormData();
    formData.append('font', file);
  
    try {
      setUploading(true);
      const response = await axios.post('http://localhost/font-group-system-backend/upload-font', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Ensure the content-type is set for file uploads
        },
      });

      console.log("response:::->", response?.data?.status);
      // Handle SweetAlert on upload success
      if (response?.data?.status === 'success') {
        setShow(false);
        Swal.fire({
          title: 'Success!',
          text: response?.data?.message,
          icon: 'success',
          confirmButtonText: 'ok'
        });
        refreshFonts();
      } else {
        setShow(false);
        Swal.fire({
          title: 'Error!',
          text: response?.data?.message,
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      }
    } catch (error) {
      setShow(false);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to upload font.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    } finally {
      setUploading(false);
    }
  };


  
  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Font</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Col sm="12">
              <label className="d-flex flex-column align-items-center justify-content-center w-100 p-4 border border-2 border-dashed border-secondary rounded cursor-pointer">
                <input
                  type="file"
                  accept=".ttf"
                  className="d-none"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#6c757d" className="bi bi-upload" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5-.4h3a.5.5 0 0 1 0 1H1v3h14v-3h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 .5.4v4.1a.5.5 0 0 1-.5.5H1a.5.5 0 0 1-.5-.5V9.9z"/>
                  <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V10.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                </svg>
                <span className="mt-2 text-muted small">Click to upload or drag and drop</span>
                <span className="mt-2 text-muted small">Only TTF File Allowed</span>
              </label>
              {uploadMessage && (
                <div className={`mt-2 text-center ${
                  uploadMessage.includes('success') ? 'text-success' : 'text-danger'
                }`}>
                  {uploadMessage}
                </div>
              )}
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CustomModal;
