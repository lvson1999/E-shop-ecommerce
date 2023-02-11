import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Error from "./Errors";

function Login(props) {
    let params = useParams();
    const navigate = useNavigate();


    const [inputs, setInput] = useState({
      email: "",
      password: "",
      level: ""
    })

    const [errors, setErrors] = useState({})


    const handleInput = (e) => {
      const nameInput = e.target.name;
      const value = e.target.value;

      setInput(state => ({...state, [nameInput]: value}))
    }

    function handleSubmit(e) {
      e.preventDefault();

      let errorsSubmit = {};
      let flag = true;

      if(inputs.email == "") {
        errorsSubmit.email = "Vui long nhap email!"
        flag = false;
      }
      if(inputs.password == "") {
        errorsSubmit.password = "Vui long nhap password!"
        flag = false;
      }
      if(inputs.level == "") {
        errorsSubmit.level = "Vui long nhap level!"
        flag = false
      }

      if(!flag) {
        setErrors(errorsSubmit)
      }
      else {
        const data = {
          email: inputs.email,
          password: inputs.password,
          level: 0
        }

        axios.post("http://localhost/laravel/laravel/public/api/login", data)
        .then((res) => {
          console.log(res)
          if(res.data.errors) {
            setErrors(res.data.errors)
          }else {
            alert("login thanh cong")
            navigate('/')

            let userData = localStorage.setItem("appState", JSON.stringify(res));

            let check = true;
            localStorage.setItem("getcheck", JSON.stringify(check));

          }
        })
        console.log(data)
      }
    }

    return (
      <>
        <Error errors = {errors} />
          <div className="col-sm-4 col-sm-offset-1">
          <div className="login-form">{/*login form*/}
            <h2>Login to your account</h2>
            <form action="#" onSubmit={handleSubmit}>
              <input type="email" placeholder="Email Address" name="email" onChange={handleInput} />
              <input type="password" placeholder="Password" name="password" onChange={handleInput} />
              <input type="text" placeholder="Level" name="level" onChange={handleInput} />
              <button type="submit" className="btn btn-default">Login</button>
            </form>
          </div>{/*/login form*/}
        </div>
      </>
    )
}

export default Login;