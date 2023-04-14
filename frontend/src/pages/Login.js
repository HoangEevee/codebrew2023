import React, { useEffect, useState } from "react";
import axios from "axios";

function Login() {
    const [registerUsername, setRegisterName] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [accountData, setaccountData] = useState("");

    //all accounts data
    const [data, setData] = useState("");
    //all restaurants data
    const [restaurants, setRestaurant] = useState("");

    //Grab all accounts upon page load
    useEffect(() => {
        axios.get("/account/allAccounts").then((res) => {
            setData(res.data);
        });

        axios.get("/restaurant/allRestaurants").then((res) => {
            setRestaurant(res.data);
        });
    }, []);

    //create new user on mongodb and update display list
    async function createAccount(e) {
        e.preventDefault();
        try {
            // console.log({registerUsername,registerPassword})
            await axios.post("/account/register", {
                name: registerUsername,
                password: registerPassword,
                role: "customer"
            });
            axios.get("/account/allAccounts").then((res) => {
                setData(res.data);
            });
        } catch (error) {
            console.log(error);
        }
    }

    const login = () => {
        axios({
            method: "POST",
            data: {
                username: loginUsername,
                password: loginPassword
            },
            withCredentials: true,
            url: "/account/login"
        }).then((res) => console.log(res));
    };

    //grab logged in account data
    const getUser = () => {
        axios({
            method: "GET",

            withCredentials: true,
            url: "/account/oneAccount"
        }).then((res) => setaccountData(res.data));
    };

    const deleteRestaurant = (restaurantID) => {
        console.log(restaurantID);
        axios({
            method: "DELETE",

            withCredentials: true,
            url: "/restaurant/deleteRestaurant",
            data: {
                _id: restaurantID
            }
        }).then((res) => {
            console.log(res);
            // axios.get("/restaurant/allRestaurants").then(res=>{
            //     setRestaurant(res.data)
            // })
            setRestaurant(
                restaurants.filter(
                    (restaurant) => restaurant._id !== restaurantID
                )
            );
        });
    };

    const changeRestaurantName = (e, restaurantID) => {
        e.preventDefault();
        const restaurantName = e.target[0].value;
        console.log(e);
        axios({
            method: "PUT",

            withCredentials: true,
            url: "/restaurant/updateRestaurant",
            data: {
                _id: restaurantID,
                name: restaurantName
            }
        }).then((res) => {
            axios.get("/restaurant/allRestaurants").then((res) => {
                setRestaurant(res.data);
            });
        });
    };

    return (
        <div>
            <h1>Create new account</h1>
            <form onSubmit={createAccount}>
                <label htmlFor="registerUsername">Username:</label>
                <br />
                <input
                    type="text"
                    id="registerUsername"
                    value={registerUsername}
                    onChange={(e) => setRegisterName(e.target.value)}
                />
                <br />
                <label htmlFor="registerPassword">Password:</label>
                <br />
                <input
                    type="text"
                    id="registerPassword"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <br />
                <button type="submit">Send Name</button>
            </form>

            <ul>
                {Object.keys(data).map((key) => {
                    return (
                        <li>
                            {key}. Username: {data[key].username}. Password:{" "}
                            {data[key].password}
                        </li>
                    );
                })}
            </ul>

            <ul>
                <p>
                    Delete button only remove restaurant from the list below but{" "}
                    <u>
                        <strong>not actually delete it from database</strong>
                    </u>
                    . Code for that is implemeted but commented out for safety
                    reason
                </p>
                {Object.keys(restaurants).map((key) => {
                    return (
                        <li id={restaurants[key]._id}>
                            {key}. Restaurant name: {restaurants[key].name}.
                            Cuisine: {restaurants[key].cuisine}
                            {/* for delete restaurant */}
                            <button
                                onClick={() =>
                                    deleteRestaurant(restaurants[key]._id)
                                }
                            >
                                Delete
                            </button>
                            {/* for Update restaurant name */}
                            <form
                                onSubmit={(e) =>
                                    changeRestaurantName(
                                        e,
                                        restaurants[key]._id
                                    )
                                }
                            >
                                <label htmlFor="changeRestaurantName">
                                    New Name:
                                </label>
                                <br />
                                <input type="text" id="changeRestaurantName" />
                                <br />
                                <button type="submit">Change Name</button>
                            </form>
                            <br />
                        </li>
                    );
                })}
            </ul>

            <div>
                <h1>Login</h1>
                <input
                    placeholder="username"
                    onChange={(e) => setLoginUsername(e.target.value)}
                />
                <input
                    placeholder="password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button onClick={login}>Submit</button>
            </div>

            <div>
                <h1>Get User</h1>
                <button onClick={getUser}>Submit</button>
                {accountData ? (
                    <h1>Welcome Back {accountData.username}</h1>
                ) : null}
            </div>

            <a href="./hi">Greeting!</a>
        </div>
    );
}

export default Login;