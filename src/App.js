import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import AllItems from "./pages/AllItems";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import './App.css';
import { Routes, Route } from "react-router-dom";
import ViewFoodDetails from "./components/ViewFoodDetails/ViewFoodDetails";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
import AllOrders from "./pages/AllOrders";
import AddFood from "./pages/AddFood";
const App=()=>{
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(()=>{
    if(
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role") 
    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  })
  return( 
  <div>
    
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/all-items" element={<AllItems />}/>
        <Route path="/Cart" element={<Cart />}/>
        <Route path="/profile" element={<Profile />}>
        {role === "user" ? <Route index element={<Favourites/>}/> : <Route index element={<AllOrders/>} />}
        {role === "admin" && <Route path="/profile/add-food" element={<AddFood/>}/>}
        <Route path="/profile/orderHistory" element={<UserOrderHistory/>}/> 
        <Route path="/profile/settings" element={<Settings/>}/> 
        </Route>
        <Route path="/SignUp" element={<SignUp />}/>
        <Route path="/LogIn" element={<LogIn />}/>
        <Route path="view-book-details/:id" element={<ViewFoodDetails />} />
      </Routes>
      <Footer/>
    
  </div>
  );
};

export default App;
