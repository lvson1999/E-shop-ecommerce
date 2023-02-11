import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductList(props) {

    const [inputs, setInput] = useState("");

    useEffect(() => {
        axios.get("http://localhost/laravel/laravel/public/api/product/list")
        .then(response => {
            setInput(response.data.data.data);
            console.log(response.data.data.data);
        })
        .catch(function(error) {
            console.log(error)
        })
    }, [])

    function renderProductList() {
        if(inputs.length > 0) {
            return inputs.map((value, key) => {
                let image = JSON.parse(value.image);
                console.log(value);
                return (
                    <div className="col-sm-4">
                        <div className="product-image-wrapper">
                            <div className="single-products">
                                <div className="productinfo text-center">
                                <img src={"http://localhost/laravel/laravel/public/upload/user/product/" + value.id_user + "/" + image[0]} alt="" />
                                <h2>${value.price}</h2>
                                <p>{value.name}</p>
                                <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                                <div className="product-overlay">
                                <div className="overlay-content">
                                    <h2>${value.price}</h2>
                                    <p>{value.name}</p>
                                    <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                                </div>
                            </div>
                            <div className="choose">
                                <ul className="nav nav-pills nav-justified">
                                <li><a href><i className="fa fa-plus-square" />Add to wishlist</a></li>
                                <li><a href><i className="fa fa-plus-square" />Add to compare</a></li>
                                </ul>
                            </div>
                        </div>
                        <Link to={"/product/detail/" + value.id} class="btn btn-primary" >Read More</Link>
                    </div>
                )
            })
        }
    }



    return (
        <div className="col-sm-9 padding-right">
            <div className="features_items">{/*features_items*/}
            <h2 className="title text-center">Features Items</h2>
            {renderProductList()}
            <ul className="pagination">
                <li className="active"><a href>1</a></li>
                <li><a href>2</a></li>
                <li><a href>3</a></li>
                <li><a href>»</a></li>
            </ul>
            </div>{/*features_items*/}
        </div>
    )
}

export default ProductList;