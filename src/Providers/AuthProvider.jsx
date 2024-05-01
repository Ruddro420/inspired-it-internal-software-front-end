import {createContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { adminLogin, adminLogout, checkAdminLogin } from '../lib/api'
export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [admin, setAdmin]  = useState(null)

    const [loading, setLoading] = useState(true)

    const changeUserState = (user) => {
        setLoading(false)
        setAdmin(user)
    }

   const AdminLogin = (email, password) => {
        return adminLogin(email, password)
   } 

    const AdminLogout = () => {
        return adminLogout();
    }

    const CheckAdminLogin = () => {
        return checkAdminLogin()
    }


    const authInfo = {
        admin,
        loading,
        changeUserState,
        AdminLogin,
        AdminLogout,
        CheckAdminLogin
    }
    

    useEffect(() => {
    //     fetch('http://localhost:5000/check_admin_login', {
    //     method: 'GET',
    //     credentials: 'include', 
    //   })
    checkAdminLogin()
        .then(res=> res.json())
        .then(user => {
            setLoading(false)
            if(user.loggedIn){
                setAdmin(user)
            } else{
                setAdmin(false)
            }
        })
        .catch(err =>{
            setLoading(false)
            console.log(err)
            setAdmin(null)
        })
    }, [])



    return (
        <AuthContext.Provider value={authInfo}>
            { children }
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider;