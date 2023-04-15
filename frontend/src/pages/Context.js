import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const myContext = createContext({})

export default function Context(props) {
    const [user, setUser] = useState()
    useEffect(() => {
        axios.get("/", {
            withCredentials: true
        })
        .then((res) => {
            setUser(res.data);
        })
    }, [])

    return (
        <myContext.Provider value={user}>{props.childen}</myContext.Provider>
    )
}