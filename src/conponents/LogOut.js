import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function Signout() {

    const [ setError] = useState('');
    const {  logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError('')
        try {
            await logout()
            history.push("/login")
        } catch {
            setError('failed to logout !')
        }
    }

    return (
        <a
            href="#"
            className="btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 text-center btn-block"
            onClick={handleLogout}
        >
            <i className="fad fa-sign-out mr-1" />
            Đăng xuất
        </a>


    );
}

export default Signout;