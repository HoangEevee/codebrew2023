import axios from "axios";
// import { myContext } from "./pages/Context";
import { useContext, useState, useEffect } from "react";

function Customize() {
    //This thing has the user data when they logged in
    // const context = useContext(myContext)

    const [commonList, setCommonList] = useState("")
    //Grab all accounts upon page load
    useEffect(() => {
        axios.get("/account/allAccounts").then((res) => {
            setCommonList(res.data);
        });
    }, []);

    return (
        <div class="center-container">
            <p>Select your list</p>
            {/* {Object.keys(commonList).map((key) => {
                    return (
                        <div class="btn">
                            <p>{commonList[key].wish}</p>
                        </div>
                    );
                })} */}
            <div class = "btn">
                <p>Schedule a family meeting</p>
            </div>
            <div class = "btn">
                <p>Schedule a family meeting</p>
            </div>
            <div class = "btn">
                <p>Schedule a family meeting</p>
            </div>
            <div class = "btn">
                <p>Schedule a family meeting</p>
            </div>
            <div class = "btn">
                <p>Schedule a family meeting</p>
            </div>
        </div>
    )
}

export default Customize;