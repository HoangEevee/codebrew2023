import axios from "axios";
// import { myContext } from "./pages/Context";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Customize() {
    const navigate = useNavigate()
    //This thing has the user data when they logged in
    // const context = useContext(myContext)

    const [commonList, setCommonList] = useState("")
    const [wishList, setWishList] = useState([])

    useEffect(() => {
        axios.get("/getTopTenWish").then((res) => {
            setCommonList(res.data);
        })
    }, []);

    const click = (event) => {
        const target = event.target
        if (target.className == "select-box") {
            target.className = "select-box selected"
            setWishList(old => [...old,target.innerText])
            console.log(wishList)
        }   
    }

    const sendWish = () => {
        console.log(wishList)
        // axios({
        //     method: "POST",
        //     data: {
        //         wishList: wishList
        //     },
        //     withCredentials:true,
        //     url:"/addWishList"
        // })
        navigate("/Account")
    }

    return (
        <div class="center-container">
            <p>Select your list</p>
            {Object.keys(commonList).map((key) => {
                    return (
                        <div class="select-box" onClick={click}>
                            {commonList[key].wish}
                        </div>
                    );
                })}
            <hr></hr>
            <div class="horizontal-flex">
                <button class="btn"><i class="fa fa-solid fa-refresh"></i></button>
                <button class="btn" onClick={sendWish}><i class="fa fa-solid fa-arrow-right"></i></button>
            </div>
            <p><u>Customize later</u></p>
        </div>
    )
}

export default Customize;