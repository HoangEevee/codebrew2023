import axios from "axios";
import { myContext } from "./pages/Context";
import { useContext } from "react";

function Account() {
    //This thing has the user data when they logged in
    const context = useContext(myContext)
}

export default Account;