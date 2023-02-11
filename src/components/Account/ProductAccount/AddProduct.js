import axios from "axios";
import { useEffect, useState } from "react";
import Error from "../../Member/Errors";

function CreateProduct(props) {

    // lay du lieu tu api set vao  useState
    const [inputCategory, setInputCategory] = useState("")
    const [inputBrand, setInputBrand] = useState("")


    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [brand, setBrand] = useState("")
    const [status, setStatus] = useState("")
    const [companyProfile, setCompanyProfile] = useState("")
    const [sale, setSale] = useState("")

    const [detail, setDetail] = useState("")
    const [file, setFile] = useState("");
    const [avatar, setAvatar] = useState("")

    const [fileLength, setFileLength] = useState("");


    const [errors, setErrors] = useState({});



    useEffect(() => {
        axios.get("http://localhost/laravel/laravel/public/api/category-brand")
        .then(response => {
            setInputCategory(response.data.category)
            setInputBrand(response.data.brand)
        })
        .catch(function(error) {
            console.log(error)
        })
    }, [])


    function renderCategory() {
        if(inputCategory.length>0) {
            return inputCategory.map((value, key) => {
                return (
                    <option value={value.id} key={key}>{value.category}</option>
                )
            })
        }
    }

    function renderBrand() {
        if(inputBrand.length>0) {
            return inputBrand.map((value, key) => {
                return (
                        <option value={value.id} key={key}>{value.brand}</option>
                )
            })
        }
    }

    function renderSale() {
        if(status == 0) {
            return (
                <>
                    <input type="text" placeholder="0" style={{width: 160, display: "inline-block"}} onChange={handleSale}/><span> %</span>
                </>
            )
        }
    }




    const handleStatus = (e) => {
        setStatus(e.target.value)
    }

    function handleFile(e) {
        const files = e.target.files;
        setFile(files);
        setAvatar(files)
    }

    function handleName(e) {
        setName(e.target.value)
    }

    function handlePrice(e) {
        setPrice(e.target.value)
    }

    function handleCategory(e) {
        setCategory(e.target.value)
    }
    
    function handleBrand(e) {
        setBrand(e.target.value)
    }
    
    function handleCompanyProfile(e) {
        setCompanyProfile(e.target.value)
    }
    function handleDetail(e) {
        setDetail(e.target.value)
    }

    function handleSale(e) {
        setSale(e.target.value);
    }


    function handleSubmit(e) {
        e.preventDefault();

        let errorsSubmit = {};
        let flag = true;
        
        if (name == "") {
            errorsSubmit.name = "Vui long nhap name";
            flag = false
        }

        if (price == "") {
            errorsSubmit.price = "Vui long nhap price";
            flag = false;
        }

        if (category == "") {
            errorsSubmit.category = "Vui long chon category";
            flag = false;
        }

        if(brand == "") {
            errorsSubmit.brand = "Vui long chon brand";
            flag = false;
        }

        if(companyProfile == "") {
            errorsSubmit.companyProfile = "Vui long nhap company profile";
            flag =false;
        }

        if(detail == "") {
            errorsSubmit.detail = "Vui long nhap detail";
            flag = false;
        }

        if(sale == "") {
            errorsSubmit.sale = "Vui long nhap % sale!"
            flag =false;
        }

        if(file =="") {
            errorsSubmit.file = "Vui long chon tep!"
            flag = false;
        } else {
            let duoiFile = [
                "image/png",
                "image/jpg",
                "image/PNG",
                "image/JPG",
                "image/jpeg",]
            Object.keys(file).map((value, index) => {
                console.log(file[value])

                if(file[value]["size"] > 1024 * 1024 ) {
                    errorsSubmit.file = "Vui long chon tep nho hon 1mb";
                    flag = false;
                } 
                else if(!duoiFile.includes(file[value]["type"])) {
                    errorsSubmit.file = "Vui long chon file dung dinh dang!";
                    flag = false;
                }
    
                 else if(file.length > 3) {
                    errorsSubmit.fileLength = "Vui long chon toi da la 3 file!"
                    flag = false;
                }
            });

            
        }


        if(!flag) {
            setErrors(errorsSubmit);
        }

        else {
            alert('Ban da tao don hang moi  hang thanh cong')

            console.log(status)
            const userData = JSON.parse(localStorage["appState"]);

            let url = "http://localhost/laravel/laravel/public/api/user/add-product" ;

            let accessToken = userData.data.success.token;

            let config =  {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                } 
                };

                let formData = new FormData();
                formData.append('name', name )
                formData.append('price', price );
                formData.append('category', category);
                formData.append('brand', brand );
                formData.append('company', companyProfile );
                formData.append('detail', detail );
                formData.append('status', status );
                formData.append('sale', sale );

                // console.log(avatar)
                Object.keys(avatar).map((item, i) => {
                    // console.log(avatar[item])
                    formData.append("file[]", avatar[item]);
                });

                

            axios.post(url, formData, config)
            .then(response => {
                console.log(response)
            })

            localStorage.setItem("token", JSON.stringify(config))
        }
    }
    

    return (
        <>
            <Error errors = {errors}/>
                    <div className="col-sm-9">
                        <div className="signup-form">{/*sign up form*/}
                            <h2>Create Product!</h2>
                            <form action="#" enctype="multipart/form-data" onSubmit={handleSubmit}  >
                                <input type="text" placeholder="Name" name="name" onChange={handleName} />
                                <input type="text" placeholder="Price" name="price" onChange={handlePrice}  />
                                <select value={category} onChange={handleCategory} >
                                    <option value="">Vui long chon category</option>
                                    {renderCategory()}
                                </select>
                                <select value={brand} onChange={handleBrand}>
                                    <option value= "">Vui long chon brand</option>
                                    {renderBrand()}
                                </select>
                                <select value={status} id="status" name="status" onChange={handleStatus}>
                                    <option value={0}>sale</option>
                                    <option value={1}>new</option>
                                </select>
                                {renderSale()}
                                <input type="text" placeholder="Company profile" name="phone" onChange={handleCompanyProfile}  />
                                <textarea type="text" placeholder="Detail" name="detail" onChange={handleDetail} />
                                <input type="file" name="file" multiple onChange={handleFile} />
                                <button type="submit" className="btn btn-default">Signup</button>
                            </form>
                        </div>
                    </div>
        </> 
    )
}

export default CreateProduct;