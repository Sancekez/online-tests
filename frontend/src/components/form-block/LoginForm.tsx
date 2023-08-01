import { useForm } from "react-hook-form";

import { useAuthUserMutation } from "../../redux/api/usersApi";
import { Link } from "react-router-dom";

export function FormBlockLogin() {
   const [
      authUser, // This is the mutation trigger
      { isLoading }, // This is the destructured mutation result
   ] = useAuthUserMutation();

   const onSubmit = (data: object) => {
      try {
         authUser(data);
         console.log(data);
      } catch (error) {
         console.log(error);
      }
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   return (
      <form
         className="form-block form-block--center"
         onSubmit={handleSubmit(onSubmit)}
      >
         <h2 className="form-block__title">Login like student</h2>

         <label className="form-block__input" htmlFor="f-3">
            <input
               id="f-3"
               placeholder="Email"
               type="email"
               {...register("email", { required: true })}
            />
            {errors.email && <p>Please check the Email</p>}
         </label>

         <label className="form-block__input" htmlFor="f-4">
            <input
               id="f-4"
               placeholder="Password"
               type="password"
               {...register("password", { required: true })}
            />
            {errors.password && <p>Please check the Password</p>}
         </label>

         <p className="form-block__subtitle">
            <Link to={"/register"}>
               If you don't have an accaunt, go to Registration
            </Link>
         </p>

         <button className="form-block__button" type="submit">
            Login
         </button>
      </form>
   );
}
