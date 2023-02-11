import axios from "axios";
import { useEffect, useState } from "react";

function ListComment(props) {
  let {showComment} = props;

  let {reply} = props;

  let {getReply} = props
  // console.log(showComment)

    function handleReply(e) {
    //  console.log(e.target.id) ;
    //  lấy id_comment từ list comment
     getReply(e.target.id) ;
    }

    function renderComment() {
      
      if(showComment) {
        return showComment.map((value, key) => {
          if(value.id_comment == 0) {
            return (
              <>
              
                <li className="media" key={key}>
                <a className="pull-left" href="#">
                  <img className="media-object" src={"http://localhost/laravel/laravel/public/upload/user/avatar/" + value.image_user} alt="" />
                </a>
                <div className="media-body">
                  <ul className="sinlge-post-meta">
                    <li><i className="fa fa-user" />Janis Gallagher</li>
                    <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                    <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                  </ul>
                  <p>{value['comment']}</p>
                  <a id={value['id']} href="#cmt" type="submit" className="btn btn-primary" onClick={handleReply} ><i className="fa fa-reply" />Replay</a>
                </div>
                </li>

                {showComment.map((value2, j) => {
                  if(value.id == value2.id_comment) {
                    return (
                      <li className="media second-media" key={j}>
                        <a className="pull-left" href="#">
                          <img className="media-object" src={"http://localhost/laravel/laravel/public/upload/user/avatar/" + value.image_user} alt="" />
                        </a>
                        <div className="media-body">
                          <ul className="sinlge-post-meta">
                            <li><i className="fa fa-user" />Janis Gallagher</li>
                            <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                            <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                          </ul>
                          <p>{value2["comment"]}</p>
                          <a className="btn btn-primary" href="cmt"><i className="fa fa-reply" />Replay</a>
                        </div>
                      </li>
                    )
                  }
                })}
            </>
            )

          }
          
          
          
        })
        
      }
    }




    return (
        <div className="response-area">
          <h2>3 RESPONSES</h2>
          <ul className="media-list">
            {/* <li className="media">
              <a className="pull-left" href="#">
                <img className="media-object" src="images/blog/man-two.jpg" alt="" />
              </a>
              <div className="media-body">
                <ul className="sinlge-post-meta">
                  <li><i className="fa fa-user" />Janis Gallagher</li>
                  <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                  <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                </ul>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
              </div>
            </li>
            <li className="media second-media">
              <a className="pull-left" href="#">
                <img className="media-object" src="images/blog/man-three.jpg" alt="" />
              </a>
              <div className="media-body">
                <ul className="sinlge-post-meta">
                  <li><i className="fa fa-user" />Janis Gallagher</li>
                  <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                  <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                </ul>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
              </div>
            </li>
            <li className="media second-media">
              <a className="pull-left" href="#">
                <img className="media-object" src="images/blog/man-three.jpg" alt="" />
              </a>
              <div className="media-body">
                <ul className="sinlge-post-meta">
                  <li><i className="fa fa-user" />Janis Gallagher</li>
                  <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                  <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                </ul>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
              </div>
            </li>
            <li className="media second-media">
              <a className="pull-left" href="#">
                <img className="media-object" src="images/blog/man-three.jpg" alt="" />
              </a>
              <div className="media-body">
                <ul className="sinlge-post-meta">
                  <li><i className="fa fa-user" />Janis Gallagher</li>
                  <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                  <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                </ul>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
              </div>
            </li>
            <li className="media">
              <a className="pull-left" href="#">
                <img className="media-object" src="images/blog/man-four.jpg" alt="" />
              </a>
              <div className="media-body">
                <ul className="sinlge-post-meta">
                  <li><i className="fa fa-user" />Janis Gallagher</li>
                  <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                  <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                </ul>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
              </div>
            </li>
            <li className="media second-media">
              <a className="pull-left" href="#">
                <img className="media-object" src="images/blog/man-three.jpg" alt="" />
              </a>
              <div className="media-body">
                <ul className="sinlge-post-meta">
                  <li><i className="fa fa-user" />Janis Gallagher</li>
                  <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                  <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                </ul>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
              </div>
            </li>
            <li className="media second-media">
              <a className="pull-left" href="#">
                <img className="media-object" src="images/blog/man-three.jpg" alt="" />
              </a>
              <div className="media-body">
                <ul className="sinlge-post-meta">
                  <li><i className="fa fa-user" />Janis Gallagher</li>
                  <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                  <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                </ul>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
              </div>
            </li>
            <li className="media second-media">
              <a className="pull-left" href="#">
                <img className="media-object" src="images/blog/man-three.jpg" alt="" />
              </a>
              <div className="media-body">
                <ul className="sinlge-post-meta">
                  <li><i className="fa fa-user" />Janis Gallagher</li>
                  <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                  <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                </ul>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
              </div>
            </li> */}
            {renderComment()}
          </ul>					
        </div>
    )
}

export default ListComment;