import {FormBlockRegister} from "../components/form-block/RegisterFormBlock";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function Register() {
   const isAuth = useSelector((state: RootState) => state.isAuthUser.auth);

   return (
     <>
         {
         !isAuth ? <div style={{paddingTop: "150px"}}>
            <FormBlockRegister/>
         </div>: <p>You are registered</p>
         }
      </>
     
   );
}

export default Register;