import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import Slide from "./Slide";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Image } from 'react-bootstrap';






function ProductDetail() {
    let params = useParams();
    const [getItem, setItem] = useState("");

    const [imageJson, setImageJson] = useState("");

    const [image, setImage] = useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
      axios.get("http://localhost/laravel/laravel/public/api/product/detail/" + params.id )
      .then(response => {
        setItem(response.data.data)
        setImageJson(JSON.parse(response.data.data.image));
        setImage(JSON.parse(response.data.data.image)[0])
        // console.log(JSON.parse(response.data.data.image)[0])
        
      })

      .catch(function(error) {
        console.log(error)
      })
    }, [])


    function handleImages(e) {
      setImage(e.target.id)
    }


    function renderImage() {
      if(imageJson.length > 0) {
        return imageJson.map((value, key) => {
          return (
              <a  key={key}  ><img id={value}  onClick={handleImages} src={"http://localhost/laravel/laravel/public/upload/user/product/" + getItem.id_user + "/" + value} alt=""  /></a>
          )
        })
      }
    }


    return (
        <div className="col-sm-9 padding-right">
            <div className="product-details">{/*product-details*/}
                <div className="col-sm-5">
                    <div className="view-product">
                    <img src={"http://localhost/laravel/laravel/public/upload/user/product/" + getItem.id_user + "/" + image} alt="" />
                    <a  rel="prettyPhoto"  ><h3 onClick={handleShow}>ZOOM</h3></a>
                    </div>
                    <Modal  show={show} onHide={handleClose} animation={false}>
                    <Image width={"600"} height={"600"}
                      src={"http://localhost/laravel/laravel/public/upload/user/product/" + getItem.id_user + "/" + image}
                    
                    />
                    </Modal>
                    <div id="similar-product" className="carousel slide" data-ride="carousel">
                    {/* Wrapper for slides */}
                    <div className="carousel-inner" >
                      <div className="item active">
                      {renderImage()}
                      </div>
                    </div>
                    {/* Controls */}
                    <a className="left item-control" href="#similar-product" data-slide="prev">
                        <i className="fa fa-angle-left" />
                    </a>
                    <a className="right item-control" href="#similar-product" data-slide="next">
                        <i className="fa fa-angle-right" />
                    </a>
                    </div>
                </div>
                <div className="col-sm-7">
                    <div className="product-information">{/*/product-information*/}
                    <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                    <h2>{getItem.name}</h2>
                    <p>Web ID: {getItem.id}</p>
                    <img src="images/product-details/rating.png" alt="" />
                    <span>
                        <span>US ${getItem.price}</span>
                        <label>Quantity:</label>
                        <input type="text" defaultValue={1} />
                        <button type="button" className="btn btn-fefault cart">
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                        </button>
                    </span>
                    <p><b>Availability:</b> In Stock</p>
                    <p><b>Condition:</b> New</p>
                    <p><b>Brand:</b> E-SHOPPER</p>
                    <a href><img src="images/product-details/share.png" className="share img-responsive" alt="" /></a>
                    </div>{/*/product-information*/}
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;