import Header from "./components/header/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import Tests from "./pages/Tests";
import CreateTest from "./pages/CreateTest";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";

// import {useCheckAuth} from "./hooks/useCheckAuth"

function App() {
   // useCheckAuth();

   const isAuth = useSelector((state: RootState) => state.isAuthUser.auth);

   return (
      <>
         <Header />
         <Routes>
            <Route path="/" element={isAuth ? <Main /> : <Login />} />
            <Route path="/create-test" element={isAuth ? <CreateTest /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tests" element={isAuth ? <Tests /> : <Login />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </>
   );
}

export default App;
