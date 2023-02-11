import axios from "axios";
import { useState } from "react";
import Error from "./Errors";

function Register(props) {
    // const [inputs, setInput] = useState({
    //     name: "",
    //     email: "",
    //     password: "",
    //     phone: "",
    //     address: "",
    //     level: ""
    // })

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [level, setLevel] = useState("")

    const [file, setFile] = useState("");
    const [avatar, setAvatar] = useState("");
    const [errors, setErrors] = useState({})


    function handleName(e) {
        setName(e.target.value)
    }
    function handleEmail(e) {
        setEmail(e.target.value)
    }
    function handlePassword(e) {
        setPassword(e.target.value)
    }
    function handlePhone(e) {
        setPhone(e.target.value)
    }
    function handleAddress(e) {
        setAddress(e.target.value)
    }
    function handleLevel(e) {
        setLevel(e.target.value)
    }



    function handleFile(e) {
        const file = e.target.files;
        console.log(file)

        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result);
            setFile(file[0]);
        };
        reader.readAsDataURL(file[0]);
        // setFile(state => ({...state, file }))
    }

    function handleSubmit(e) {
        e.preventDefault();

        let errorsSubmit={};
        let flag = true;
        if(name == "") {
            errorsSubmit.name = "Vui long nhap name"
            flag = false;
        }
        if(email == "") {
            errorsSubmit.email = "Vui long nhap email!"
            flag = false;
        }
        if(password == "") {
            errorsSubmit.password = "Vui long nhap password!"
            flag = false;
        }
        if(phone == "") {
            errorsSubmit.phone = "Vui long nhap phone"
            flag = false;
        }
        if(address == "") {
            errorsSubmit.address = "Vui long nhap address!"
            flag = false;
        }
        if(file =="") {
            errorsSubmit.file = "Vui long chon tep!"
            flag = false;
        } else {
            let duoiFile = ["image/png", "image/jpg", "image/jfif", "image/jpeg","image/PNG", "image/PEG" ]
            if(file["size"] > 1024 * 1024 ) {
                errorsSubmit.file = "Vui long chon tep nho hon 1mb";

            } else if(!duoiFile.includes(file["type"])) {
                errorsSubmit.file = "Vui long chon file dung dinh dang!"
            }
        }

        if(level == "") {
            errorsSubmit.level = "Vui long nhap level!"
            flag = false;
        }

        if(!flag) {
            setErrors(errorsSubmit);
        }
        else {
           
            const data = {
                name: name,
                email: email,
                password: password,
                phone: phone,
                address: address,
                avatar:avatar,
                level:0

            }
            axios.post("http://localhost/laravel/laravel/public/api/register", data)
            .then((res) => {
                if(res.data.errors){
                    setErrors(res.data.errors)
                }else{
                    alert("dk thanh cong")
                }
            })
            console.log(data)

        }
    }

    return(
        <>
        <Error errors = {errors}/>
        <div className="col-sm-4">
        <div className="signup-form">{/*sign up form*/}
          <h2>New User Signup!</h2>
          <form action="#" enctype="multipart/form-data" onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" name="name" onChange={handleName} />
            <input type="email" placeholder="Email Address" name="email" onChange={handleEmail}/>
            <input type="password" placeholder="Password" name="password" onChange={handlePassword} />
            <input type="text" placeholder="Phone" name="phone" onChange={handlePhone} />
            <input type="text" placeholder="Address" name="address" onChange={handleAddress} />
            <input type="file" name="file" onChange={handleFile} />
            <input type="text" placeholder="level" name="level" onChange={handleLevel}/>
            <button type="submit" className="btn btn-default">Signup</button>
          </form>
        </div>{/*/sign up form*/}
      </div>
        </>
        
    )
}
export default Register;