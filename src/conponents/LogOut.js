import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Signout() {
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('role');
            localStorage.removeItem('email');
            localStorage.removeItem('fullname');
            localStorage.removeItem('imageUrl');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Link to="#" className="btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 text-center btn-block" onClick={handleLogout}>
            <i className="fad fa-sign-out mr-1" />
            Đăng xuất
        </Link>
    );
}

export default Signout;
