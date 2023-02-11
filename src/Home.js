import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addNewHobby } from "./actions/hobby";
import { UserContext } from "./UserContext";

function Home() {

  const [inputs, setInput] = useState("");
  const [quantity, setQuantity] = useState(1);


  const dispatch = useDispatch();

  const value = useContext(UserContext);

    useEffect(() => {
        axios.get("http://localhost/laravel/laravel/public/api/product")
        .then(response => {
            // console.log(response.data.data);
            setInput(response.data.data);
        })
        .catch(function(error) {
            console.log(error)
        })
    }, []);


    const addToCart = (e) => {
      let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {};
      let id = e.target.id.toString();

      cart[id] = (cart[id] ? cart[id]: 0);
      let qty = cart[id]  + parseInt(quantity);
      cart[id] = qty;

      // tinh tong quantity de dung ham useContext hien thi len gio hang;
      let tongqty = 0;
      Object.keys(cart).map((value, index) => {
        tongqty += cart[value];
      })
      // console.log(tongqty);
      value.testContext(tongqty)

      // Dispatch action to add a new hobby to redux store
      const action = addNewHobby(tongqty);
      dispatch(action);

      // let tonmgqty = 133;
      // value.testContext(tonmgqty)
      localStorage.setItem("cart", JSON.stringify(cart));
      // console.log(cart)
    }

    function renderProductHome() {
      if(inputs.length > 0) {
        return inputs.map((value, key) => {
          let image = JSON.parse(value.image);
          // console.log(value)
          return (
            <div key={key} className="col-sm-4">
            <div className="product-image-wrapper">
              <div className="single-products">
                <div className="productinfo text-center">
                  <img src={"http://localhost/laravel/laravel/public/upload/user/product/" + value.id_user + "/" + image[0]} alt="" />
                  <h2>${value.price}</h2>
                  <p>{value.name}</p>
                  <a id={value.id} onClick={addToCart} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                </div>
                <div className="product-overlay">
                  <div className="overlay-content">
                    <h2>${value.price}</h2>
                    <p>{value.name}</p>
                    <a id={value.id} onClick={addToCart} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                  </div>
                </div>
              </div>
              <div className="choose">
                <ul className="nav nav-pills nav-justified">
                  <li><a href="#"><i className="fa fa-plus-square" />Add to wishlist</a></li>
                  <li><a href="#"><i className="fa fa-plus-square" />Add to compare</a></li>
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
          {renderProductHome()}
        </div>{/*features_items*/}
        </div>
    )
}
export default Home;