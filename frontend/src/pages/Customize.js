import axios from "axios";
// import { myContext } from "./pages/Context";
import { useContext, useState, useEffect } from "react";

function Customize() {
    //This thing has the user data when they logged in
    // const context = useContext(myContext)

    const [commonList, setCommonList] = useState("")
    //Grab all accounts upon page load
    useEffect(() => {
        axios.get("/getRandomTen").then((res) => {
            setCommonList(res.data);
        })
    }, []);

    const click = (event) => {
        const target = event.target
        target.class = "select-box selected"
    }

    return (
        <div class="center-container">
            <p>Select your list</p>
            {Object.keys(commonList).map((key) => {
                    return (
                        <div class="select-box" onClick={click}>
                            <p>{commonList[key].wish}</p>
                        </div>
                    );
                })}
            {/* <div class = "select-box" onClick={click}>
                <p>Schedule a family meeting</p>
            </div>
            <div class = "select-box" onClick={click}>
                <p>Schedule a family meeting</p>
            </div>
            <div class = "select-box" onClick={click}>
                <p>Schedule a family meeting</p>
            </div>
            <div class = "select-box" onClick={click}>
                <p>Schedule a family meeting</p>
            </div>
            <div class = "select-box" onClick={click}>
                <p>Schedule a family meeting</p>
            </div> */}
            <div class="horizontal-flex">
                <button class="btn"><i class="fa fa-solid fa-refresh"></i></button>
                <button class="btn"><i class="fa fa-solid fa-arrow-right"></i></button>
            </div>
            <p><u>Customize later</u></p>
        </div>
    )
}

export default Customize;