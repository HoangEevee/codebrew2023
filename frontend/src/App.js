import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Customize from "./pages/Customize";
import { myContext } from "./pages/Context";
import { useContext } from "react";
function App() {
    //This thing has the user data when they logged in
    const context = useContext(myContext)
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={< Login/>} />
                <Route path="/customize" element={<Customize/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;