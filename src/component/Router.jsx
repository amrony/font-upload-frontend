import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import FontGroup from "../pages/FontGroup";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/font-group" element={<FontGroup />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;