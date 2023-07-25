import logo from "../../images/logo.png";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";

function Header() {
   return (
      <header className="header">
         <div className="header__container container">
            <div className="header__row">
               <Link to="/">
                  <img src={logo} alt="" className="header__logo" />
               </Link>
               <Navbar />
            </div>
         </div>
      </header>
   );
}

export default Header;
