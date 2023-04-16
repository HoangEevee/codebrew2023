import axios from "axios";
import { useState, useEffect} from "react";
// import { myContext } from "./pages/Context";
// import { useContext } from "react";

function Account() {
    const [wish,setWish] = useState("")

    useEffect(() => {
        axios.get("/allAccounts").then((res) => {
            for (let r of res.data) {
                if (r.name == "2"){
                    setWish(r.wishlist);
                    break
                }
            }
        })
    }, []);

    //This thing has the user data when they logged in
    // const context = useContext(myContext)
    return (
        <div class="center-container">
            <p>Your list is ready</p>
            <div class="wish-container">
                {Object.keys(wish).map((key) => {
                    return (
                        <div class="wishbox" >
                            {wish[key]}
                        </div>
                    );
                })}
                {/* <div class="wishbox" >
                    thing to do 1
                </div>
                <div class="wishbox" >
                    thing to do 2
                </div>
                <div class="wishbox" >
                    thing to do 3
                </div>
                <div class="wishbox" >
                    thing to do 4
                </div> */}
            </div>
            <p><u>Add another wish</u></p>
        </div>
    )
}

export default Account;