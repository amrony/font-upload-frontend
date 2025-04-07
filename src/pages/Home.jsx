import { useEffect, useState } from "react";
import DashboardLayout from "../component/HOC/DashboardLayout";
import CustomModal from "../component/CustomModal";
import { Button } from "react-bootstrap";
import axios from "axios";
import CustomTable from "../component/CustomTable";

const Home = () => {
    const [fonts, setFonts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchFonts();
    }, []);




    const fetchFonts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost/font-group-system/get-fonts');

            if (response?.data?.status === 'success') {
                setFonts(response?.data?.data);
            } else {
                setError('Failed to fetch fonts');
            }
        } catch (err) {
            setError('An error occurred while fetching fonts');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading fonts...</div>;
    }

    return (
        <DashboardLayout>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                <h1>Font List</h1>

                <Button onClick={() => setShow(true)}>Add Font</Button>
            </div>
            
            <CustomModal
                show={show}
                setShow={setShow}
                refreshFonts={fetchFonts}  
                setFonts={setFonts}
            />
            <div className="">
                <CustomTable 
                    data={fonts} 
                    setFonts={setFonts} 
                    refreshFonts={fetchFonts}
                />
            </div>
        </DashboardLayout>
    );
};

export default Home;
