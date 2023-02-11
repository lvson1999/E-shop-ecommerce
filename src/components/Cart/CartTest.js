import axios from "axios";
import { useEffect, useState } from "react";

function CartTest() {

    const [inputs, setInputs] = useState({
        productItem: [],
        total: 0,
        quantity: 1, 
        totalPrice: 0
    })


    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({...state, [nameInput]:value}))
    }

    useEffect(() => {
        let cart = localStorage.getItem("cart");
    
        axios.post("http://localhost/laravel/laravel/public/api/product/cart", cart)
        .then((res) => {
            if(res.data.response === "success") {
                let total = 0;
                setInputs.productItem(res.data.data);
                for (var i = 0 ; i < inputs.productItem.length; i++) {
                    total += inputs.productItem[i].price * inputs.productItem[i].qty
                }
                setInputs.totalPrice(total)
            } else {
                console.log("error")
            }
            console.log(res)
        })
        .catch(function (error) {
            console.log(error)
        })
    }, [])

    function renderProduct() {
        if(inputs.productItem.length > 0) {
            return inputs.productItem.map((product, index) => {
                let image = JSON.parse(product.image)
                let toltalPrice = 0;
                toltalPrice += product.price * product.qty;
                return (
                    <tr key={index}>
                        <td className="cart_product">
                            <a href><img width="110" height="110" src={"http://localhost/laravel/laravel/public/upload/user/product/" + product.id_user + "/" + image[0]} alt="" /></a>
                        </td>
                        <td className="cart_description">
                            <h4><a href>{product.name}</a></h4>
                            <p>Web ID: {product.id}</p>
                        </td>
                        <td className="cart_price">
                            <p>${product.price}</p>
                        </td>
                        <td className="cart_quantity">
                            <div className="cart_quantity_button">
                            <a className="cart_quantity_up"  href> + </a>
                            <input className="cart_quantity_input" type="text" name="quantity" defaultValue={product.qty} autoComplete="off" size={2} />
                            <a className="cart_quantity_down" href> - </a>
                            </div>
                        </td>
                        <td className="cart_total">
                            <p className="cart_total_price">${toltalPrice}</p>
                        </td>
                        <td className="cart_delete">
                            <a className="cart_quantity_delete" href><i className="fa fa-times" /></a>
                        </td>
                    </tr>
                )
            })
        }
    }

    return (
        <>
            <section id="cart_items">
                <div className="container">
                <div className="breadcrumbs">
                    <ol className="breadcrumb">
                    <li><a href="#">Home</a></li>
                    <li className="active">Shopping Cart</li>
                    </ol>
                </div>
                <div className="table-responsive cart_info">
                    <table className="table table-condensed">
                    <thead>
                        <tr className="cart_menu">
                        <td className="image">Item</td>
                        <td className="description" />
                        <td className="price">Price</td>
                        <td className="quantity">Quantity</td>
                        <td className="total">Total</td>
                        <td />
                        </tr>
                    </thead>
                    <tbody>
                        {renderProduct()}
                    </tbody>
                    </table>
                </div>
                </div>
            </section> 
        </>
    )
}

export default CartTest;