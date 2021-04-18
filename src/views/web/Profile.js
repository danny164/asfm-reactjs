import React, { useEffect, useState } from 'react';
import 'react-bootstrap';
import AsideLeft from '../../conponents/pages/AsideLeft';
import AsideRight from '../../conponents/pages/AsideRight';
import EditProfile from '../../conponents/pages/EditProfile.jsx';
import MainProfile from '../../conponents/pages/MainProfile';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';

export default function Profile() {
    const { currentUser } = useAuth();
    const [isShowProfile, setIsShowProfile] = useState(true);
    const [isShowEdit, setIsShowEdit] = useState(false);

    const [userInfor, setUserInfor] = useState({
        email: currentUser.email,
        uid: currentUser.uid,
        error: '',
        alert: '',
        input: {
            fullname: '',
            phone: '',
            address: '',
        },
    });

    function changeToEdit() {
        setIsShowEdit(true);
        setIsShowProfile(false);
    }

    function changeToProfile() {
        setIsShowEdit(false);
        setIsShowProfile(true);
        setUserInfor({
            ...userInfor,
            error: 'edit success !',
            alert: 'green',
        });
    }

    async function editProfile(fullName, phone, address) {
        try {
            await db.collection('ShopProfile').doc(userInfor.uid).set({
                fullname: fullName,
                phone: phone,
                address: address,
            });
            changeToProfile();
        } catch {
            console.log('error');
        }
    }

    useEffect(() => {
        async function fetchUserInfor() {
            try {
                await db
                    .collection('ShopProfile')
                    .doc(userInfor.uid)
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            setUserInfor({
                                ...userInfor,
                                input: doc.data(),
                            });
                            console.log(setUserInfor.input);
                        } else {
                            console.log('No such document!');
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserInfor();
    }, []);

    return (
        <div className="header-fixed sidebar-enabled bg">
            <div className="d-flex flex-row flex-column-fluid page">
                <AsideLeft />
                {isShowProfile && <MainProfile onChange={changeToEdit} user={userInfor} />}
                {isShowEdit && <EditProfile user={userInfor} edit={editProfile} />}
                <AsideRight name={userInfor.input.fullname} />
            </div>
        </div>
    );
}
