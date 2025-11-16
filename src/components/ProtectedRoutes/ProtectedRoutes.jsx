import { Navigate } from 'react-router-dom'
// import {jwtDecode}from 'jwt-decode'

export default function ProtectedRoutes({children}) {
    let token=localStorage.getItem('token')
    try{
        // const decoded=jwtDecode(token);
        // console.log(decoded);
    }catch(error){
        localStorage.clear()
        console.log("error");
        
        return <Navigate to="/auth"/>

    }
    if(token)return children
     return <Navigate to="/auth"/>
  
}
