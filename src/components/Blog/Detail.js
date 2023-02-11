import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import ListComment from "./ListComment";
import Rate from "./Rate";

function BlogDetail(props) {
    let params = useParams();
    const [data, setData] = useState("");

    const [cmt, setComment] = useState("");

    const [idCmt, setIdCmt] = useState("")




    useEffect(() => {
      axios.get("http://localhost/laravel/laravel/public/api/blog/detail/" + params.id)
      .then(response => {
        setData(response.data.data)
        setComment(response.data.data.comment)
        console.log(response.data)
      })
      .catch(function(error) {
        console.log(error)
      })

    },[])

    function fetchData() {
      // console.log(data)
      if(Object.keys(data).length > 0) {
        // console.log(typeof data.image)
          return (
            <div>
              <div className="single-blog-post">
              <h3>{data.title}</h3>
                <div className="post-meta">
                  <ul>
                    <li><i className="fa fa-user" /> Mac Doe</li>
                    <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                    <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                  </ul>
                  {/* <span>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star-half-o"></i>
                    </span> */}
                </div>
                <a href>
                  <img src={"http://localhost/laravel/laravel/public/upload/Blog/image/" + data.image} alt="" />
                </a>
                <p>
                  {data.description}</p> <br />
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p> <br />
                <p>
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p> <br />
                <p>
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                </p>
                <div className="pager-area">
                  <ul className="pager pull-right">
                    <li><a href="#">Pre</a></li>
                    <li><a href="#">Next</a></li>
                  </ul>
                </div>
              </div>
            </div>
          )
        
      }
    }

    function getComment(value) {
      let listComment = cmt.concat(value)

      setComment(listComment)

      // console.log(listComment)
    }


    function getReply(reply) {
      console.log(reply)

      setIdCmt(reply)

    }
    // console.log(idCmt);

    return (
        <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Latest From our Blog</h2>
          {fetchData()}
        </div>{/*/blog-post-area*/}
        <Rate idBlog = {params}/>
        <div className="socials-share">
          <a href><img src="images/blog/socials.png" alt="" /></a>
        </div>{/*/socials-share*/}
        <ListComment showComment = {cmt} getReply={getReply} idCmt = {idCmt}/>
        <Comment idBlog = {params} getComment={getComment} idCmt = {idCmt}/>
      </div>
    )
}
export default BlogDetail