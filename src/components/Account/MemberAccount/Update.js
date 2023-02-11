import axios from "axios"
import { useEffect, useState } from "react"
import Error from "../../Member/Errors"

function Update(props) {

    const [inputs, setInput] = useState({
        name: "",
        email: "",
        password: "",
        level:0,
        address: "",
        country: "",
        phone: "",
      });

    const [file, setFile] = useState("");
    const [avatar, setAvatar] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const userData = JSON.parse(localStorage["appState"]);

            setInput({
                name: userData.data.Auth.name,
                email: userData.data.Auth.email,
                password: userData.data.Auth.password,
                address: userData.data.Auth.address,
                phone: userData.data.Auth.phone
                
            })
        
    }, [])

    


    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;

        setInput (state => ({...state, [nameInput]: value}))
    }

    // console.log(typeof account.data.Auth.name)
    
    
    
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


    
    // console.log(account.data.Auth.name);

    function handleSubmit(e) {
        e.preventDefault();
        let errorsSubmit = {};
        let flag = true;

        if(inputs.name == "") {
            errorsSubmit.name = "Vui long nhap name";
            flag = false;
        }
        if(inputs.address == "") {
            errorsSubmit.address = "Vui long nhap address";
            flag = false;
        }
        if(inputs.country == "") {
            errorsSubmit.country = "Vui long nhap country";
            flag = false;
        }
        if(inputs.phone == "") {
            errorsSubmit.phone = "Vui long nhap phone";
            flag = false;
        }

        if(file =="") {
            errorsSubmit.file = "Vui long chon tep!"
            flag = false;
        } else {
            let duoiFile = ["image/png", "image/jpg", "image/jfif", "image/jpeg","image/PNG", "image/PEG"]
            if(file["size"] > 1024 * 1024 ) {
                errorsSubmit.file = "Vui long chon tep nho hon 1mb";

            } else if(!duoiFile.includes(file["type"])) {
                errorsSubmit.file = "Vui long chon file dung dinh dang!"
            }
        }

        if(!flag) {
            setErrors(errorsSubmit)
        }

        else {
            alert("Update thanh cong");
            console.log(file)
            console.log(avatar)

            const userData = JSON.parse(localStorage["appState"]);

            let url = "http://localhost/laravel/laravel/public/api/user/update/" + userData.data.Auth.id;

            let accessToken = userData.data.success.token;

            let config =  {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            } 
            };

            const formData = new FormData();
                formData.append('name', inputs.name )
                formData.append('email', inputs.email )
                formData.append('password', inputs.password ? inputs.password : "");
                formData.append('address', inputs.address )
                formData.append('country', inputs.country )
                formData.append('phone', inputs.phone )
                formData.append('avatar', avatar )
            axios.post(url, formData, config)
            .then(response => {
                console.log(response)


                localStorage.setItem("appState", JSON.stringify(response))
            })

        }
    }


    return (
        <>
            <Error errors = {errors}/>
                    <div className="col-sm-3">
                    </div>
                    <div className="col-sm-6">
                        <div className="signup-form">{/*sign up form*/}
                            <h2>User Update!</h2>
                            <form action="#" enctype="multipart/form-data" onSubmit={handleSubmit} >
                                <input type="text" placeholder="Name" name="name" value={inputs.name} onChange={handleInput}/>
                                <input type="email" placeholder="Email Address" name="email" readOnly value={inputs.email} onChange={handleInput} />
                                <input type="password" placeholder="Password" name="password" value={inputs.password} onChange={handleInput} />
                                <input type="text" placeholder="address" name="address" value={inputs.address} onChange={handleInput}/>
                                <input type="text" placeholder="country" name="country" onChange={handleInput} />
                                <input type="text" placeholder="phone" name="phone" value={inputs.phone} onChange={handleInput} />
                                <input type="file" placeholder="file" name="file" onChange={handleFile}/>
                                <button type="submit" className="btn btn-default">Signup</button>
                            </form>
                        </div>
                    </div>
        </>       
    )
}

export default Update;