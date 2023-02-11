import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";

function MyProduct(props) {
    let params = useParams();
    const [data, setData] = useState("");
    const [idProduct, setIdProduct] = useState("");

    const [dataId, setDataId] = useState("");

    let {getIdProduct} = props;



    
   

    useEffect(() => {
      // const token = JSON.parse(localStorage["token"]);
      // console.log(token)
  
      const userData = JSON.parse(localStorage["appState"]);
      let accessToken = userData.data.success.token;
  
      let config =  {
          headers: {
              'Authorization': 'Bearer ' + accessToken,
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
          } 
        };

      axios.get("http://localhost/laravel/laravel/public/api/user/my-product", config)
      .then(response => {
        setData(response.data.data)
        // console.log(response.data.data[5])
      })
      .catch(function(error) {
        console.log(error)
      })
    },[])
    
    function handleIdProduct(e) {
      // console.log( e.target.id)
      setIdProduct(e.target.id);

      let url = "http://localhost/laravel/laravel/public/api/user/delete-product/";
      const userData = JSON.parse(localStorage["appState"]);
      let accessToken = userData.data.success.token;
      let config =  {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        } 
      };

      axios.get(url + e.target.id, config)
      .then(response => {
        setData(response.data.data)
      })
      .catch(function(error) {
        console.log(error)
      })
    }

    function fetchData () {
      if(Object.keys(data).length > 0) {
        return Object.keys(data).map((value, index) =>{
          // console.log(data[value])
          let image = JSON.parse(data[value]["image"]);
          // console.log(image)
          return (
            
              <tr key={index}>
                  <td className="cart_quantity" >
                    <p><a href>{data[value]["id"]}</a></p>
                  </td>
                  <td >
                    <p><a href>{data[value]["name"]}</a></p>
                  </td>
                  <td>
                  <a href><img width="50" height="50" src={"http://localhost/laravel/laravel/public/upload/user/product/" + data[value]["id_user"] + "/" + image[0] } alt="" /></a>
                  </td>
                  <td >
                    <p>${data[value]["price"]}</p>
                  </td>
                  <td>
                    <Link to={"/account/product/edit/" + data[value]["id"]}><p>edit</p></Link>
                  </td>
                  <td>
                    <a href="#" id= {data[value]["id"]}  onClick={handleIdProduct}>x</a>
                  </td>
                </tr>
            
          )
        })
      }
    }


    return (
        <div className="col-sm-9" id="cart_items">
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                    <td className="id">Id</td>
                    <td className="name">Name</td>
                    <td className="images">Image</td>
                    <td className="price">Price</td>
                    <td className="action"  colSpan="2">Action</td>
                </tr>
              </thead>
              <tbody>
                {fetchData()}
              </tbody>
            </table>
            <Link to={"/account/product/edit/" + idProduct} style={{ float: "right" }} className="btn btn-default check_out" >Add new</Link>
          </div>
      </div>
    )
}

export default MyProduct