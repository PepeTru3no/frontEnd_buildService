import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Authcontext';
import { TokenContext } from '../context/TokenContext';

const Logout = () => {
    const navigate = useNavigate();
    const {setUsuario} = useContext(AuthContext);   
    const {setToken}= useContext(TokenContext); 
    useEffect(()=>{
        const logout=()=>{
            localStorage.removeItem('token');
            setUsuario('');
            setToken('')
            navigate('/');
        }
        logout();
    },[])
  return (
    <></>
  )
}
export default Logout