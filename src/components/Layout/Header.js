import { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

function Header(props) {
  const value = useContext(UserContext);
  // console.log(value);

  const hobbyList = useSelector(state => state.hobby.list);
  console.log(hobbyList);

  const navigate = useNavigate();
  // const effect = useEffect();

  let logout = localStorage.getItem("getcheck");
  if(logout) {
    logout = JSON.parse(logout);
  }

  function renderLogin() {
    if(logout == true) {
      return(
        <li><Link to="/login" onClick={logOut}  id="cart" ><i class="fa fa-shopping-cart" ></i>
        Logout</Link></li>
      )
    } else {
      return(
        <li><Link to="/login"  id="cart" ><i class="fa fa-shopping-cart" ></i>
        Login</Link></li>
      )
    }
  }

  function logOut() {
    localStorage.clear();
    navigate('/login')
  }

  function renderQty(){
      return (
        <span >{value.data}</span>
      )
  }

  return (
    <div>
        <header id="header">
        <div className="header_top">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <div className="contactinfo">
                  <ul className="nav nav-pills">
                    <li><a href="#"><i className="fa fa-phone" /> +2 95 01 88 821</a></li>
                    <li><a href="#"><i className="fa fa-envelope" /> info@domain.com</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="social-icons pull-right">
                  <ul className="nav navbar-nav">
                    <li><a href="#"><i className="fa fa-facebook" /></a></li>
                    <li><a href="#"><i className="fa fa-twitter" /></a></li>
                    <li><a href="#"><i className="fa fa-linkedin" /></a></li>
                    <li><a href="#"><i className="fa fa-dribbble" /></a></li>
                    <li><a href="#"><i className="fa fa-google-plus" /></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-middle">
          <div className="container">
            <div className="row">
              <div className="col-md-4 clearfix">
                <div className="logo pull-left">
                  <Link to="/"><img src="images/home/logo.png" alt="" /></Link>
                </div>
                <div className="btn-group pull-right clearfix">
                  <div className="btn-group">
                    <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                      USA
                      <span className="caret" />
                    </button>
                    <ul className="dropdown-menu">
                      <li><a href>Canada</a></li>
                      <li><a href>UK</a></li>
                    </ul>
                  </div>
                  <div className="btn-group">
                    <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                      DOLLAR
                      <span className="caret" />
                    </button>
                    <ul className="dropdown-menu">
                      <li><a href>Canadian Dollar</a></li>
                      <li><a href>Pound</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-8 clearfix">
                <div className="shop-menu clearfix pull-right">
                  <ul className="nav navbar-nav">
                    <li><Link to="/account"><i className="fa fa-user" /> Account</Link></li>
                    <li><a href><i className="fa fa-star" /> Wishlist</a></li>
                    <li><Link to="/checkout"><i className="fa fa-crosshairs" /> Checkout</Link></li>
                    <li><Link to="/product/cart"><i className="fa fa-shopping-cart" /> Cart {renderQty()} </Link>  </li>
                    {renderLogin()}
                    {/* <li onChange={renderLogin}><Link  to="/member/login"><i className="fa fa-lock"  /> Login</Link></li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <div className="container">
            <div className="row">
              <div className="col-sm-9">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                  </button>
                </div>
                <div className="mainmenu pull-left">
                  <ul className="nav navbar-nav collapse navbar-collapse">
                    <li><Link to="/" className="active">Home</Link></li>
                    <li className="dropdown"><a href="#">Shop<i className="fa fa-angle-down" /></a>
                      <ul role="menu" className="sub-menu">
                        <li><a href="/product/detail">Products</a></li>
                        <li><Link to="/shop.html">Product Details</Link></li> 
                        <li><Link to="/checkout">Checkout</Link></li> 
                        <li><Link to="/account/product/cart">Cart</Link></li> 
                        <li><Link to="/member/login">Login</Link></li> 
                      </ul>
                    </li> 
                    <li className="dropdown"><a href="#">Blog<i className="fa fa-angle-down" /></a>
                      <ul role="menu" className="sub-menu">
                        <li><Link to="/blog/list">Blog List</Link></li>
                        <li><Link to="/blog/detail/">Blog Single</Link></li>
                      </ul>
                    </li> 
                    <li><a href="404.html">404</a></li>
                    <li><a href="contact-us.html">Contact</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="search_box pull-right">
                  <input type="text" placeholder="Search" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
  
}


export default Header;
