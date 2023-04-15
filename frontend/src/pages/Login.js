import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../res/angel.png"
import { useNavigate } from "react-router-dom";
function Login() {
    const [registerName, setRegisterName] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerAge, setRegisterAge] = useState("");

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const navigate = useNavigate()
    //create new user on mongodb and update display list
    async function createAccount(e) {
        e.preventDefault();
        try {
            // console.log({registerUsername,registerPassword})
            await axios.post("/createAccount", {
                name: registerName,
                password: registerPassword,
                email: registerEmail,
                age: registerAge,
                fbAcc: null,
                IgAcc: null,
            }).then(navigate("/customize"));
        } catch (error) {
            console.log(error);
        }
    }

    const login = () => {
        axios({
            method: "POST",
            data: {
                email: loginEmail,
                password: loginPassword
            },
            withCredentials: true,
            url: "/login"
        }).then(navigate("/customize"));
    };

    const swap = () => {
        const containers = document.querySelectorAll(".center-container")
        containers.forEach((container) => {
            if (container.className == "center-container") {
                container.className = "center-container invisible"
            }
            else {
                container.className = "center-container"
            }
        })
    }


    return (
        <div>
            <div class="center-container" id="login">
                <img class="logo-img" src={logo} alt="logo"></img>

                <a href="#" class="btn facebook">
                    <i class="fa fa-facebook fa-fw"></i>Log in with Facebook</a>
                <a href="#" class="btn instagram">
                    <i class="fa fa-instagram fa-fw"></i>Log in with Instagram</a>
                
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
                <p>Don't have an account? 
                    <span class="swap-to-register" onClick={swap}> <u>Go to signup</u></span>
                </p>
            </div>

            <div class="center-container invisible" id="register">
                <img class="logo-img" src={logo} alt="logo"></img>
                <input class="btn"
                    placeholder="Enter your name..."
                    onChange={(e) => setRegisterName(e.target.value)}
                />
                <input class="btn"
                    placeholder="Enter your password..."
                    onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <input class="btn"
                    placeholder="Enter your email..."
                    onChange={(e) => setRegisterEmail(e.target.value)}
                />
                <input class="btn"
                    placeholder="Enter your age..."
                    onChange={(e) => setRegisterAge(e.target.value)}
                />
                <button class="btn" onClick={createAccount}>Register Account</button>
                <hr></hr>
                <p>Got an account already? 
                    <span class="swap-to-register" onClick={swap}> <u>Go to login</u></span>
                </p>
            </div>
        </div>
    );
}

export default Login;