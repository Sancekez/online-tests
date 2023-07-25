import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser } from "../../redux/slices/authUserSlice";
import type { RootState } from "../../redux/store";

function Navbar() {
   const isAuth = useSelector((state: RootState) => state.isAuthUser.auth);
   const dispatch = useDispatch()

   return (
      <nav className="navbar">
         <ul className="navbar__list">
            <li>
               <Link to="/" className="navbar__link">
                  Main
               </Link>
            </li>
            <li>
               <Link to="tests" className="navbar__link">
                  My tests
               </Link>
            </li>
            <li>
               <Link to="create-test" className="navbar__link">
                  Create new test
               </Link>
            </li>

            <li>
               {isAuth ? (
                  <a onClick={()=>dispatch(setAuthUser(false))} className="navbar__link">
                     Logout
                  </a>
               ) : (
                  <>
                     <Link to="login" className="navbar__link">
                        Login
                     </Link>
                     <Link to="register" className="navbar__link">
                        Registration
                     </Link>
                  </>
               )}
            </li>
         </ul>
      </nav>
   );
}

export default Navbar;
