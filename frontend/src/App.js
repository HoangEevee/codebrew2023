import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Customize from "./pages/Customize";
import Account from "./pages/Account"
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
                <Route path="/account" element={<Account/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;