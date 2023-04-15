import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../res/logo.svg"
function Login() {
    const [registerUsername, setRegisterName] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [accountData, setaccountData] = useState("");

    //all accounts data
    const [data, setData] = useState("");

    //Grab all accounts upon page load
    useEffect(() => {
        axios.get("/account/allAccounts").then((res) => {
            setData(res.data);
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
                username: loginEmail,
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

    return (
        <div id="login-container">
            <img class="logo-img" src={logo} alt="logo"></img>

            <a href="#" class="btn facebook">
                <i class="fa fa-facebook fa-fw"></i>Continue with Facebook</a>
            <a href="#" class="btn instagram">
                <i class="fa fa-instagram fa-fw"></i>Continue with Instagram</a>
            
            <input class="btn"
                placeholder="Enter your email..."
                onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input class="btn"
                placeholder="Enter your password..."
                onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button class="btn" onClick={login}>Log in with email</button>
    
            <p> By Continuing with Facebook, Instagram, or Email, you agree to EndGame's Terms of Service and Privary Policy</p>
            <hr></hr>
            <p>Already signed up? Go to login</p>
{/* 

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
            </form> */}

            {/* <ul>
                {Object.keys(data).map((key) => {
                    return (
                        <li>
                            {key}. Username: {data[key].username}. Password:{" "}
                            {data[key].password}
                        </li>
                    );
                })}
            </ul> */}

            {/* <div>
                <h1>Get User</h1>
                <button onClick={getUser}>Submit</button>
                {accountData ? (
                    <h1>Welcome Back {accountData.username}</h1>
                ) : null}
            </div> */}

            {/* <a href="./hi">Greeting!</a> */}
        </div>
    );
}

export default Login;