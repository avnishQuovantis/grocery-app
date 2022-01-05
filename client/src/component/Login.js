import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import axios from "axios"
import "./css/loginSignup.scss"
export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()
    const submit = async () => {
        let obj = await axios.post("http://localhost:9000/login", { email, password })
        console.log(obj);
        let user = obj.data.user
        if (user != null) {
            dispatch({ type: "login", payload: obj.data })
            dispatch({ type: "getCart", payload: obj.data.user.cart })
            history.push("/")
        } else {
            alert(obj.data.errors)
        }
        setEmail("")
        setPassword("")
    }
    return (
        <div className="login">
            <h1 data-testid="loginTitle">Login</h1>
            <input type="email" value={email} class="form-control" placeholder="Username"
                onChange={e => setEmail(e.target.value)}
            />
            <input value={password} type="password" class="form-control" placeholder='password'
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={submit} className="btn btn-danger">submit</button>
            <div className="line"><hr />
                <span>OR</span><hr /></div>
            <button className="btn btn-primary">Signup</button>
        </div>
    )
}
