import { Container, Row } from "react-bootstrap";
import Header from "../Header";
import Sidebar from "../Sidebar";

const DashboardLayout = ({children}) => {
    return (
        <>
            {/* <Header/> */}
            <Row>
                <div className="col-2">
                    <Sidebar/>
                </div>
                <div className="col-10">
                    {children}
                </div>
            </Row>
        </>
    )
}

export default DashboardLayout;