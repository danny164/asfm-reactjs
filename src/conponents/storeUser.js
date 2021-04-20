import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';

StoreUser.propTypes = {
    storeUser: PropTypes.string
};

StoreUser.defaultProps = {
    storeUser: ''
}

function StoreUser(props) {
    const {currentUser} = useAuth()
    const {storeUser} = props

    function StoreUser(){
        if(storeUser){
            localStorage.setItem("currentUser", currentUser)
            console.log(localStorage.getItem('currentUser'))
        }
    }
    
    StoreUser()
    return (
        <div>
            
        </div>
    );
}

export default StoreUser;