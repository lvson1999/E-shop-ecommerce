import { Link } from "react-router-dom";

function MenuAcc() {

    return (
        <div className="col-sm-3">
                    <div className="left-sidebar">
                    <h2>Account</h2>
                    <div className="panel-group category-products" id="accordian">
                        <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                            <a data-toggle="collapse" data-parent="#accordian" href="#sportswear">
                                <span className="badge pull-right"><i className="fa fa-plus" /></span>
                                ACCOUNT
                            </a>
                            </h4>
                        </div>
                        <div id="sportswear" className="panel-collapse collapse">
                            <div className="panel-body">
                            <ul>
                                <li><a href="#">Nike </a></li>
                                <li><a href="#">Under Armour </a></li>
                                <li><a href="#">Adidas </a></li>
                                <li><a href="#">Puma</a></li>
                                <li><a href="#">ASICS </a></li>
                            </ul>
                            </div>
                        </div>
                        </div>
                        <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                            <Link data-toggle="collapse" data-parent="#accordian" to="/account/product/list">
                                <Link to="/account/product/create"><span className="badge pull-right"><i className="fa fa-plus" /></span></Link>
                                MY PRODUCT
                            </Link>
                            </h4>
                        </div>
                        <div id="mens" className="panel-collapse collapse">
                            <div className="panel-body">
                            <ul>
                                <li><a href="#">Fendi</a></li>
                                <li><a href="#">Guess</a></li>
                                <li><a href="#">Valentino</a></li>
                                <li><a href="#">Dior</a></li>
                                <li><a href="#">Versace</a></li>
                                <li><a href="#">Armani</a></li>
                                <li><a href="#">Prada</a></li>
                                <li><a href="#">Dolce and Gabbana</a></li>
                                <li><a href="#">Chanel</a></li>
                                <li><a href="#">Gucci</a></li>
                            </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                    
                    
                    </div>
        </div>
    )
}

export default MenuAcc;