import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import About from "./pages/About.jsx";
import Profile from "./pages/Profile.jsx";
import Header from "./components/Header.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import Property from "./pages/Property.jsx";
import PropertyList from "./pages/PropertyList.jsx";
import UpdateListing from "./pages/UpdateListing.jsx";
import Contact from "./components/Contact.jsx";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/sign-in" element={<SignIn/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/property/:id" element={<Property/>}/>

                <Route element={<PrivateRoute/>}>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/create-property-listing" element={<CreateListing/>}/>
                    <Route path="/view-property" element={<PropertyList/>}/>
                    <Route path="/update-property/:id" element={<UpdateListing/>}/>

                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
