import React, { useEffect, useState } from 'react';
import ScrollToTop from 'react-scroll-to-top';
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
        input: {
            fullname: '',
            phone: '',
            address: '',
            district: '',
            ward: '',
            detailAddress: '',
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
            error: 'chỉnh sửa thông tin thành công !',
        });
    }

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
            changeToProfile();
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
                    .get()
                    .then((doc) => {
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
    }, [isShowProfile]);

    return (
        <>
            <ScrollToTop smooth color="#6f00ff" />
            <div className="header-fixed sidebar-enabled bg">
                <div className="d-flex flex-row flex-column-fluid page">
                    <AsideLeft isShowChange={isShowProfile} />
                    {isShowProfile && <MainProfile onChange={changeToEdit} user={userInfor} />}
                    {isShowEdit && <EditProfile user={userInfor} edit={editProfile} />}
                    <AsideRight name={userInfor.input.fullname} />
                </div>
            </div>
        </>
    );
}
