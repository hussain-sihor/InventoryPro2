import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";



const PrivateRoute = ({ children }) => {
   const [authenticated,setAuthenticated] = useState("false");
   const navigate = useNavigate();
   
   useEffect(()=>{
      
      const getUser = async() =>{
         const token = localStorage.getItem("token");
         if(! token){setAuthenticated(false); return};

        try{
            await axiosInstance.get("/users/getuser", {
                  headers: {
                     Authorization: `Bearer ${token}`,
                  },
               }).then((res)=>{
                  if(res.status == 200){
                     setAuthenticated(true);
                  }
                  else{
                     setAuthenticated(false);
                  }
               })
        }catch(err){
         setAuthenticated(false);
        }
         
      }

      getUser();
   },[])
   
   
   if (authenticated === null) {
      return <div>Loading...</div>; // Or a loading spinner while checking auth
  }
  return authenticated ? children : <Navigate to="/login" />
};

export default PrivateRoute;