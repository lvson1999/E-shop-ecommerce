import axios from "axios";
import { useState } from "react";
import Error from "../Member/Errors";

function Comment(props) {

  let {idCmt} = props;

  // console.log(idCmt)

  let logout = localStorage.getItem("getcheck");
  if(logout) {
    logout = JSON.parse(logout);
  }
  


    const [textAreA, setTextArea] = useState("");
    const [errors, setErrors] = useState({})

    function handleTextArea(e) {
      setTextArea(e.target.value)
    }

    function handleSubmit(e) {
      e.preventDefault();

      let errorsSubmit={};
      let flag = true;
      if(logout != true) {
        
        alert("Vui long login!")
        // flag = false;
      }
      if(textAreA == "") {
        errorsSubmit.textArea = "Vui long nhap comment!"
        flag = false
        
      }
      if(!flag) {
        setErrors(errorsSubmit)
      }
      else {
        alert("Comment thanh cong")
        // console.log(props.idBlog.id)
        const userData = JSON.parse(localStorage["appState"])

        // console.log(userData.data.success.token)
        let url = "http://localhost/laravel/laravel/public/api/blog/comment/" + props.idBlog.id

        let accessToken = userData.data.success.token;

        let config =  {
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          } 
        };
        
          const formData = new FormData();
            formData.append('id_blog', props.idBlog.id);
            formData.append('id_user', userData.data.Auth.id);
            formData.append('id_comment',idCmt ? idCmt : 0);
            formData.append('comment', textAreA);
            formData.append('image_user', userData.data.Auth.avatar);
            formData.append('name_user', userData.data.Auth.name);

          axios.post(url, formData, config)
          .then(response => {
            console.log(response)
            props.getComment(response.data.data)

            
          })

        
      }
    }


    return (
      <>
        <div className="replay-box">
          <div className="row">
            <div className="col-sm-12">
              <h2>Leave a replay</h2>
              <Error errors = {errors}/>
              <form className="text-area" onSubmit={handleSubmit}>
                <div className="blank-arrow">
                  <label>Your Name</label>
                </div>
                <span>*</span>
                <textarea id="cmt" name="message" rows={11} defaultValue={""} onChange={handleTextArea} />
                <button type="submit" className="btn btn-primary" href>post comment</button>
              </form>
            </div>
          </div>
        </div>
      </>
    )
}

export default Comment;