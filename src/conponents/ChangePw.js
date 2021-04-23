import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import AsideLeft from './pages/AsideLeft';
import AsideRight from './pages/AsideRight';
import MainChangePw from './pages/MainChangePw';

function Changepw(props) {
    const { currentUser } = useAuth();
    const [userInfor, setUserInfor] = useState({
        fullname: '',
        phone: '',
        address: '',
        district: '',
        ward: '',
        detailAddress: ''
    })

    useEffect(() => {
        async function fetchUserInfor() {
            try {
                await db
                    .collection("ShopProfile")
                    .doc(currentUser.uid)
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            setUserInfor(doc.data());
                            console.log(userInfor)
                        } else {
                            console.log("No such document!");
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserInfor();
    }, []);
    return (
        <body className="header-fixed header-mobile-fixed sidebar-enabled bg">
            <div className="d-flex flex-row flex-column-fluid page">
                <AsideLeft />
                <MainChangePw />
                <AsideRight name={userInfor.fullname} />
            </div>
        </body>
    );
}

export default Changepw;
