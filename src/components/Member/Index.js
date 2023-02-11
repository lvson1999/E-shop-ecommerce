import Login from "./Login";
import Register from "./Register";

function IndexMember(props) {
    return (
        <section id="form">{/*form*/}
        <div className="container">
          <div className="row">
            <Login/>
            <div className="col-sm-1">
              <h2 className="or">OR</h2>
            </div>
            <Register/>
          </div>
        </div>
      </section>
    )
}

export default IndexMember;