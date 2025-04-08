import { useEffect, useState } from "react";
import DashboardLayout from "../component/HOC/DashboardLayout";
import { Button } from "react-bootstrap";
import axios from "axios";
import FontGroupModal from "../component/FontGroupModal";
import FontGroupTable from "../component/FontGroupTable";

const FontGroup = () => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fontGroup, setFontGroup] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [required, setRequired] = useState([]);
    const [fonts, setFonts] = useState([
        { id: 0, name: '', font_id: '' },
        { id: 1, name: '', font_id: '' },
    ]);
    const [group, setGroup] = useState({
        id: 0,
        groupTitle: '',
    });


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

    const handleAddFontGroup = () => {
        setGroup({ id: 0, groupTitle: '' });
        setFonts([
            { id: 0, name: '', font_id: '' },
            { id: 1, name: '', font_id: '' },
        ]);
        setShow(true);
        setIsEdit(false);
    };

    return (
        <DashboardLayout>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                <h1>Font Group List</h1>
                <Button onClick={handleAddFontGroup}>Add Font Group</Button>
            </div>

            <hr />
            
            <FontGroupModal
                show={show}
                setShow={setShow}
                fonts={fonts}
                setFonts={setFonts}
                group={group}
                setGroup={setGroup}
                refreshFonts={fetchFonts}
                isEdit={isEdit}
                required={required}
                setRequired={setRequired}
            />

            <div className="">
                <FontGroupTable 
                    data={fontGroup} 
                    refreshFonts={fetchFonts}
                    show={show}
                    setShow={setShow}
                    fonts={fonts}
                    setFonts={setFonts}
                    group={group}
                    setGroup={setGroup}
                    setIsEdit={setIsEdit}
                    setRequired={setRequired}
                />
            </div>
        </DashboardLayout>
    );
};

export default FontGroup;
