import { useEffect, useState } from "react";
import DashboardLayout from "../component/HOC/DashboardLayout";
import CustomModal from "../component/CustomModal";
import { Button } from "react-bootstrap";
import axios from "axios";
import CustomTable from "../component/CustomTable";
import FontGroupModal from "../component/FontGroupModal";
import FontGroupTable from "../component/FontGroupTable";

const FontGroup = () => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fontGroup, setFontGroup] = useState([]);

    useEffect(() => {
        fetchFonts();
    }, []);

    const fetchFonts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost/font-group-system-backend/get-font-groups');

            if (response?.data?.status === 'success') {
                setFontGroup(JSON.parse(response?.data?.data));
            } else {
                console.log("Failed to fetch fonts")
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    console.log("fontGroup::", fontGroup);

    return (
        <DashboardLayout>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                <h1>Font Group List</h1>

                <Button onClick={() => setShow(true)}>Add Font Group</Button>
            </div>

            <hr />
            
            <FontGroupModal
                show={show}
                setShow={setShow}
            />

            <div className="">
                <FontGroupTable 
                    data={fontGroup} 
                    // setFonts={setFonts} 
                    // refreshFonts={fetchFonts}
                />
            </div>
        </DashboardLayout>
    );
};

export default FontGroup;
