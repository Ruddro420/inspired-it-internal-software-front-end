import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/Providers/AuthProvider";
import Loading from "@/components/app_components/Loading";
const PrivateRoute = ({ children }) => {
 const [isAdmin, setIsAdmin] = useState(false);
 const [loading, setLoading] = useState(true);
 const { CheckAdminLogin } = useContext(AuthContext)


    useEffect(() => {
    CheckAdminLogin()
        .then(res=> res.json())
        .then(user => {
            if(user.loggedIn){
                setIsAdmin(user);
            } else {
                setIsAdmin(false)
            }
            setLoading(false)
            
        })
        .catch(err =>{
            console.log(err)
            setLoading(false)
        })

    }, [CheckAdminLogin])

    if (loading) {
        return <Loading/>
    }
    // console.log("admin", isAdmin)
    if(isAdmin) return children
    

    return  <Navigate to='/'/> 

    
};

PrivateRoute.propTypes = {
    children: PropTypes.node
}


export default PrivateRoute;