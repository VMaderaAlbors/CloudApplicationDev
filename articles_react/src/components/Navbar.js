import { Link } from "react-router-dom";


function Navbar() {



    return (
        <div>
            <nav >
                <div >
                    <div className="navbar">

                        <Link className="nav-link" aria-current="page" to="/">Home</Link>

                        <Link className="nav-link" to="/new_article">New Article</Link>

                    </div>
                </div>

            </nav>




        </div>


    )
}
export default Navbar;