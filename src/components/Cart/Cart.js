import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../UserContext";

function Cart() {

    const [productItem, setProductItem] = useState([]);
    const [total, setTotal] = useState(0);

    // const value = useContext(UserContext);
    // value.testContext(productItem);



    useEffect(() => {
        let cart = localStorage.getItem("cart");
        // console.log(cart);
    
        axios.post("http://localhost/laravel/laravel/public/api/product/cart", cart)
        .then((res) => {
            if(res.data.response === "success") {
                setProductItem(res.data.data);
                // console.log(res.data.data)
            } else {
                console.log("error")
            }
        })
        .catch(function (error) {
            console.log(error)
        })
    }, []);

    const handleAddQty = (e) => {
        // lay id va qty set lai vao localstorage
        let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {};
        let id = e.target.id.toString();

        let newData = [...productItem]
        newData.map((value, key) => {
            if(e.target.id == newData[key].id ){
                newData[key].qty +=1;

                // lay id va qty set lai vao localstorage
                cart[id] = productItem[key].qty
                localStorage.setItem("cart", JSON.stringify(cart));
            } 
        });
        setProductItem(newData);
    };

    const handleRemoveQty = (e) => {
        // lay id va qty set lai vao localstorage
        let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {};
        let id = e.target.id.toString();

        let newData = [...productItem]
        newData.map((value, key) => {
            if(e.target.id == newData[key].id && newData[key].qty > 0) {
                newData[key].qty -= 1;
                // lay id va qty set lai vao localstorage
                cart[id] = productItem[key].qty
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        })
        setProductItem(newData)
    }

    const deleteCart = (e) => {

        let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {};
        let newData = [...productItem]
        
        newData.map((value, key) => {
            if(e.target.id == newData[key].id) {
                delete cart[newData[key].id]
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        })
        // xoa item cart va set lai
        let test = productItem.filter((item) => item.id !== Number(e.target.id));
        setProductItem(test);
    }

    const tinhSum = (e) => {
        let tong = 0;
        productItem.map((value, key) => {
            tong += productItem[key].price * productItem[key].qty;
        })
        return tong;
    }





    function renderProduct() {
        if(productItem.length > 0) {
            return productItem.map((value, key) => {
                let toltalPrice = 0;
                let image = JSON.parse(value.image)
                toltalPrice += value.price * value.qty;
                return (
                    <tr key={key}>
                        <td className="cart_product">
                            <a href><img width="110" height="110" src={"http://localhost/laravel/laravel/public/upload/user/product/" + value.id_user + "/" + image[0]} alt="" /></a>
                        </td>
                        <td className="cart_description">
                            <h4><a href>{value.name}</a></h4>
                            <p>Web ID: {value.id}</p>
                        </td>
                        <td className="cart_price">
                            <p>${value.price}</p>
                        </td>
                        <td className="cart_quantity">
                            <div className="cart_quantity_button">
                            <a className="cart_quantity_up" id={value.id} onClick={handleAddQty} href> + </a>
                            <input className="cart_quantity_input" type="text" name="quantity"  value={value.qty}  size={2} />
                            <a className="cart_quantity_down" id={value.id} onClick={handleRemoveQty}  href> - </a>
                            </div>
                        </td>
                        <td className="cart_total">
                            <p className="cart_total_price">${toltalPrice}</p>
                        </td>
                        <td className="cart_delete">
                            <a className="cart_quantity_delete"   href><i id={value.id} onClick={deleteCart} className="fa fa-times" /></a>
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
                        {/* <div>${tinhSum()}</div> */}
                    </tbody>
                    </table>
                </div>
                </div>
            </section>
            <section id="do_action">
                <div className="container">
                <div className="heading">
                    <h3>What would you like to do next?</h3>
                    <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                    <div className="chose_area">
                        <ul className="user_option">
                        <li>
                            <input type="checkbox" />
                            <label>Use Coupon Code</label>
                        </li>
                        <li>
                            <input type="checkbox" />
                            <label>Use Gift Voucher</label>
                        </li>
                        <li>
                            <input type="checkbox" />
                            <label>Estimate Shipping &amp; Taxes</label>
                        </li>
                        </ul>
                        <ul className="user_info">
                        <li className="single_field">
                            <label>Country:</label>
                            <select>
                            <option>United States</option>
                            <option>Bangladesh</option>
                            <option>UK</option>
                            <option>India</option>
                            <option>Pakistan</option>
                            <option>Ucrane</option>
                            <option>Canada</option>
                            <option>Dubai</option>
                            </select>
                        </li>
                        <li className="single_field">
                            <label>Region / State:</label>
                            <select>
                            <option>Select</option>
                            <option>Dhaka</option>
                            <option>London</option>
                            <option>Dillih</option>
                            <option>Lahore</option>
                            <option>Alaska</option>
                            <option>Canada</option>
                            <option>Dubai</option>
                            </select>
                        </li>
                        <li className="single_field zip-field">
                            <label>Zip Code:</label>
                            <input type="text" />
                        </li>
                        </ul>
                        <a className="btn btn-default update" href>Get Quotes</a>
                        <a className="btn btn-default check_out" href>Continue</a>
                    </div>
                    </div>
                    <div className="col-sm-6">
                    <div className="total_area">
                        <ul>
                        {/* <li>Cart Sub Total <span>$59</span></li>
                        <li>Eco Tax <span>$2</span></li>
                        <li>Shipping Cost <span>Free</span></li> */}
                        <li>Total <span>${tinhSum()}</span></li>
                        </ul>
                        <a className="btn btn-default update" href>Update</a>
                        <a className="btn btn-default check_out" href>Check Out</a>
                    </div>
                    </div>
                </div>
                </div>
            </section>{/*/#do_action*/} 
        </>
    )
}

export default Cart;