import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Offers from "./pages/offers";
import CreateListing from "./pages/create-listing";
import ForgotPassword from "./pages/forgotPassword";
import Header from './components/Header';
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRouter from './components/PrivateRouter';
import EditListing from './pages/edit-listing';
import Listing from './pages/Listing';
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<PrivateRouter />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/:categoryName/:listingID' element={<Listing/>} />
          <Route path='create-listing' element={<PrivateRouter />}>
            <Route path='/create-listing' element={<CreateListing />} />
          </Route>
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='edit-listing' element={<PrivateRouter/>}>
            <Route path='/edit-listing/:listingID' element={<EditListing />} />
          </Route>
          {/* <Route path='listing' element={<PrivateRouter/>}>
            <Route path='/edit-listing/:listingID' element={<EditListing />} />
          </Route> */}


        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        transition={Bounce}
      />
    </>
  );
}

export default App;
