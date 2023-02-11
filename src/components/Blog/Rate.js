import axios from 'axios';
import { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';

function Rate(props) {
    const [rating, setRating] = useState(0);
    const [allRating, setAllRating] = useState("")


    // function tbc(allRating) {

    //         let sum = 0;
    //         allRating.map(function (element){
    //         sum += element.rate / allRating.length;
            
    //       })
    //       return sum;
    // }

    useEffect(() => {
      axios.get("http://localhost/laravel/laravel/public/api/blog/rate/" + props.idBlog.id)
      .then(response => {
          setAllRating(response.data.data)

          let sum = 0;
          response.data.data.map(function(element){
            sum += element.rate
          })

        const tbc = sum / response.data.data.length
    
        setRating(tbc)
      
        
      })
      .catch(function(error) {
        console.log(error)
      })
    },[]);

    
    
    function changeRating(newRating, name) {
        setRating(newRating)
        let logout = localStorage.getItem("getcheck");
        if(logout) {
          logout = JSON.parse(logout);
        }

        if(logout != true) {
          alert("Vui long login")
        }
        else{
          alert("Ban da rate thanh cong")

          const userData = JSON.parse(localStorage["appState"])

          let url = "http://localhost/laravel/laravel/public/api/blog/rate/" + props.idBlog.id;
          let accessToken = userData.data.success.token; 
          let config =  {
            headers: {
              'Authorization': 'Bearer ' + accessToken,
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            } 
          };

            const formData = new FormData();
              formData.append('user_id', userData.data.Auth.id);
              formData.append('blog_id', props.idBlog.id);
              formData.append('rate', rating)

          axios.post(url, formData, config)
          .then(response => {
            console.log(response)
          })

        }

        
    }

    
        
        

    return (
        <div className="rating-area">
          <ul className="ratings">
            <li className="rate-this">Rate this item:</li>
            <StarRatings
              rating={rating}
              starRatedColor="blue"
              changeRating={changeRating}
              numberOfStars={6}
              name='rating'
            />
            <li className="color">(6 votes)</li>
          </ul>
          <ul className="tag">
            <li>TAG:</li>
            <li><a className="color" href>Pink <span>/</span></a></li>
            <li><a className="color" href>T-Shirt <span>/</span></a></li>
            <li><a className="color" href>Girls</a></li>
          </ul>
        </div>
    )
}

export default Rate;