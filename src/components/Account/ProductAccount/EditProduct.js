import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../../Member/Errors";

function EditProduct() {
    let params = useParams();


    const [inputs, setInput] = useState({
        name: "",
        price: "",
        category: "",
        brand: "",
        status: "",
        sale: "",
        companyProfile: "",
        detail: "",
        images: ""

    });

    const [theArray, setTheArray] = useState([]);

    
    

    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;

        setInput (state => ({...state, [nameInput]: value}))

        console.log(e.target.value)
    }



    // data lay tu api cua category/brand;
    const [inputCategory, setInputCategory] = useState("")
    const [inputBrand, setInputBrand] = useState("")

    // data lay tu api cua user/product/id;
    const [dataId, setDataId] = useState("");

    

    const [file, setFile] = useState("");
    const [avatar, setAvatar] = useState("");

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
    }, []);


    useEffect(() => {
        const userData = JSON.parse(localStorage["appState"]);
        let accessToken = userData.data.success.token;
        let config =  {
          headers: {
              'Authorization': 'Bearer ' + accessToken,
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
          } 
        };
  
          axios.get("http://localhost/laravel/laravel/public/api/user/product/" + params.id, config)
          .then(response => {
            console.log(response.data.data)
            setInput({
                name: response.data.data.name,
                price: response.data.data.price,
                category: response.data.data.id_category,
                brand: response.data.data.id_brand,
                status: response.data.data.status,
                sale: response.data.data.sale,
                companyProfile: response.data.data.company_profile,
                detail: response.data.data.detail,
                images: response.data.data.image,
            })
            setDataId(response.data.data);
          })
          .catch(function(error) {
            console.log(error)
          })
    
        },[])

    

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
        if(inputBrand.length > 0 ) {
            return inputBrand.map((value, key) => {
                return (
                        <option value={value.id} key={key}>{value.brand}</option>
                )
            })
        }
    }

    function renderSale() {
        if(inputs.status == 0) {
            return (
                <>
                    <input type="text" placeholder="0" style={{width: 160, display: "inline-block"}}  onChange={handleInput}/><span> %</span>
                </>
            )
        }
    }

    function renderImages() {
        if(inputs.images ) {
            return inputs.images.map((value, key) => {
                // console.log(value)
                return (
                    <>
                    <div style={{ width: "50", height: "50", display: "inline-flex" }}>
                        <img key={key} width="50" height="50" src={"http://localhost/laravel/laravel/public/upload/user/product/" + dataId.id_user + "/" + value } alt=""></img>
                        <input width="50" type="checkbox" value={value} onClick={handleNameImage}/>
                    </div>
                    {/* <input type="checkbox" width="50" height="10" id="myCheck"/> */}
                    </>
        
                )
            })
        }
    }


    
    function handleNameImage(e) {
        console.log(e.target.value);
        
        if(e.target.checked) {
            setTheArray(state => [...state, e.target.value]);
        } else {
            let result = theArray.filter(function(element) {
                return element != e.target.value;
            });
            
            setTheArray(result);
        }
    }
    

    function handleFile(e) {
        const files = e.target.files;
        setFile(files);
        setAvatar(files);
    }
    

    function handleSubmit(e) {
        e.preventDefault();

        let errorsSubmit = {};
        let flag = true;
        
        if (inputs.name == "") {
            errorsSubmit.name = "Vui long nhap name";
            flag = false
        }

        if (inputs.phone == "") {
            errorsSubmit.phone = "Vui long nhap phone!";
            flag = false;
        }

        if (inputs.category == "") {
            errorsSubmit.category = "Vui long chon category";
            flag = false;
        }

        if(inputs.brand == "") {
            errorsSubmit.brand = "Vui long chon brand";
            flag = false;
        }

        if(inputs.companyProfile == "") {
            errorsSubmit.id = "Vui long nhap ID!";
            flag = false;
        }

        
        if(inputs.detail == "") {
            errorsSubmit.detail = "Vui long nhap detail";
            flag = false;
        }

        

        if(file =="") {
            errorsSubmit.file = "Vui long chon tep!"
            flag = false;
        } else {
            let duoiFile = [
                "image/png",
                "image/jpg",
                "image/PNG",
                "image/JPG"]
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

                else if(file.length + (inputs.images.length - theArray.length) > 3) {

                    errorsSubmit.theArray = "Vui long chon file upload toi da ko qua 3 file";
                    flag = false;
                }
            });

            
        }


        if(!flag) {
            setErrors(errorsSubmit);
        }

        else {
            alert('Ban da cap nhap don hang moi thanh cong !')

            

            const userData = JSON.parse(localStorage["appState"]);

            let url = "http://localhost/laravel/laravel/public/api/user/edit-product/" + params.id ;
            let accessToken = userData.data.success.token;
            let config =  {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                } 
                };

                let formData = new FormData();
                formData.append('name', inputs.name);
                formData.append('price', inputs.price);
                formData.append('category', inputs.category);
                formData.append('brand', inputs.brand);
                formData.append('status', inputs.status);
                formData.append('sale', inputs.sale);
                formData.append('company', inputs.companyProfile);
                formData.append('detail', inputs.detail);

                // console.log(avatar)
                Object.keys(avatar).map((item, i) => {
                    // console.log(avatar[item])
                    formData.append("file[]", avatar[item]);
                });
                theArray.map((value, i) => {
                    // console.log(theArray[i])
                    formData.append("avatarCheckBox[]", theArray[i]);
                });

            axios.post(url, formData, config)
            .then(response => {
                console.log(response)
            })
                

            
        }
    }

    return (
        <>
            <Error errors = {errors} />
            <div className="col-sm-9">
                        <div className="signup-form">{/*sign up form*/}
                            <h2>Edit Product!</h2>
                            <form action="#" enctype="multipart/form-data" onSubmit={handleSubmit}  >
                                <input type="text" placeholder="Name" name="name" value={inputs.name} onChange={handleInput} />
                                <input type="text" placeholder="price" name="price" value={inputs.price} onChange={handleInput}  />
                                <select onChange={handleInput} value={inputs.category} >
                                    <option value="">Vui long chon category</option>
                                    {renderCategory()}
                                </select>
                                <select onChange={handleInput} value={inputs.brand}>
                                    <option value= "">Vui long chon brand</option>
                                    {renderBrand()}
                                </select>
                                <select  id="status" name="status"  onChange={handleInput} value={inputs.status}>
                                    <option value={0}>sale</option>
                                    <option value={1}>new</option>
                                </select>
                                {renderSale()}
                                <input type="text" placeholder="Company" name="company" value={inputs.companyProfile} onChange={handleInput}  />
                                <input type="file" name="file" multiple onChange={handleFile} />
                                {renderImages()}
                                {/* <div style={{width: "10px" , display: "inline-flex" }}> 
                                    <input type="checkbox"/>
                                    <input type="checkbox"/>
                                    <input type="checkbox"/>
                                </div> */}
                                <textarea type="text" placeholder="Detail" name="detail" value={inputs.detail} onChange={handleInput}/>
                                <button type="submit" className="btn btn-default">Signup</button>
                            </form>
                        </div>
                    </div>
            
                    
        </>
    )
}

export default EditProduct;