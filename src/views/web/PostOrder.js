import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import AsideRight from "../../conponents/pages/AsideRight";
import MainPostOrder from "../../conponents/pages/MainPostOrder";
import AsideLeft from "../../conponents/pages/AsideLeft";
import { useAuth } from "../../context/AuthContext";
import { db, realtime } from "../../firebase";

function PostOrder(props) {
    const { currentUser } = useAuth();
    const history = useHistory();

    const [userInfor, setUserInfor] = useState({
        fullname: "",
        phone: "",
        address: "",
    });
    
    //post order function
    async function PostOrder(dataPostOrder) {
        try {
            //tao bảng newsfeed
            await realtime.ref("newsfeed/" + dataPostOrder.idPost).set({
                id_post: dataPostOrder.idPost,
                noi_giao: dataPostOrder.noi_giao,
                noi_nhan: userInfor.address,
                ghi_chu: dataPostOrder.ghi_chu,
                km: dataPostOrder.km,
                thoi_gian: dataPostOrder.thoi_gian,
                sdt_nguoi_nhan: dataPostOrder.sdt_nguoi_nhan,
                ten_nguoi_nhan: dataPostOrder.ten_nguoi_nhan,
                sdt_nguoi_gui: userInfor.phone,
                ten_nguoi_gui: userInfor.fullname,
                phi_giao: dataPostOrder.phi_giao,
                phi_ung: dataPostOrder.phi_ung,
                id_shop: currentUser.uid,
                status: ""
            });

            //tạo bảng orderstatus
            await realtime.ref("OrderStatus/"+  currentUser.uid + "/" + dataPostOrder.idPost).set({
                id_post: dataPostOrder.idPost,
                id_shop: currentUser.uid,
                status: "0",
                noi_giao: dataPostOrder.noi_giao,
                noi_nhan: userInfor.address,
                ghi_chu: dataPostOrder.ghi_chu,
                km: dataPostOrder.km,
                thoi_gian: dataPostOrder.thoi_gian,
                sdt_nguoi_nhan: dataPostOrder.sdt_nguoi_nhan,
                ten_nguoi_nhan: dataPostOrder.ten_nguoi_nhan,
                sdt_nguoi_gui: userInfor.phone,
                ten_nguoi_gui: userInfor.fullname,
                phi_giao: dataPostOrder.phi_giao,
                phi_ung: dataPostOrder.phi_ung,
            });
            
            //tạo bảng transaction
            await realtime.ref("Transaction/" + dataPostOrder.idPost).set({
                id_post: dataPostOrder.idPost,
                id_shipper: '',
                id_roomchat: dataPostOrder.id_roomchat,
                status: "0"
            });
            
            //tạo bảng chatroom
            history.push("/home");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function fetchUserInfor() {
            try {
                await db
                    .collection("ShopProfile")
                    .doc(currentUser.uid)
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            setUserInfor(
                                doc.data()
                                );
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
        <div className="header-fixed sidebar-enabled bg">
            <section className="d-flex flex-row flex-column-fluid page">
                <AsideLeft />
                <MainPostOrder postOrder={PostOrder}/>
                <AsideRight name={userInfor.fullname}/>
            </section>
        </div>
    );
}

export default PostOrder;
