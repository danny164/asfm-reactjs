import React, { useEffect, useState } from 'react';
import AsideLeft from '../../components/pages/AsideLeft';
import AsideRight from '../../components/pages/AsideRight';
import MainProfile from '../../components/pages/MainProfile';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';

export default function Profile() {
    const { currentUser } = useAuth();

    const [userInfor, setUserInfor] = useState({
        email: currentUser.email,
        uid: currentUser.uid,
        error: '',
        input: {
            fullname: '',
            phone: '',
            address: '',
            district: '',
            ward: '',
            detailAddress: '',
        },
    });

    const [checkUpdateProfile, setCheckUpdateProfile] = useState(false);

    async function editProfile(fullName, phone, address, district, ward, detailAddress) {
        try {
            await db.collection('ShopProfile').doc(currentUser.uid).update({
                fullname: fullName,
                phone: phone,
                address: address,
                district: district,
                ward: ward,
                detailAddress: detailAddress,
            });

            if (checkUpdateProfile === true) {
                setCheckUpdateProfile(false);
            } else {
                setCheckUpdateProfile(true);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        async function fetchUserInfor() {
            try {
                await db
                    .collection('ShopProfile')
                    .doc(userInfor.uid)
                    .onSnapshot((doc) => {
                        if (doc.exists) {
                            localStorage.setItem('fullname', doc.data().fullname);
                            setUserInfor({
                                ...userInfor,
                                input: doc.data(),
                            });
                        }
                    });
            } catch (error) {
                setUserInfor({ ...userInfor });
                console.log(error);
            }
        }
        fetchUserInfor();
    }, []);

    return (
        <>
            <div className="header-fixed sidebar-enabled bg">
                <div className="d-flex flex-row flex-column-fluid page">
                    <AsideLeft />
                    <MainProfile user={userInfor} edit={editProfile} />
                    <AsideRight checkUpdateProfile={checkUpdateProfile} name={userInfor.input.fullname} />
                </div>
            </div>
        </>
    );
}
