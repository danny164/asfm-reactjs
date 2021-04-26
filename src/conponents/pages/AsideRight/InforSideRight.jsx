import React from 'react';
import { Link } from 'react-router-dom';
import AbstractThree from '../../../assets/media/abstract-3.svg';
import Avatar from '../../../assets/media/avatar.png';
import { useAuth } from '../../../context/AuthContext';
import Signout from '../../LogOut';

function InforSideRight(props) {
    const { currentUser } = useAuth();
    return (
        <section
            className="card card-custom bgi-no-repeat gutter-b"
            style={{ backgroundPosition: 'right top', backgroundSize: '30% auto', backgroundImage: `url(${AbstractThree})` }}
        >
            <div className="card-body pt-15">
                <div className="text-center mb-10">
                    <div className="symbol symbol-60 symbol-circle symbol-xl-90">
                        <div
                            className="symbol-label"
                            style={{
                                backgroundImage: `url(${Avatar})`,
                            }}
                        />
                        <i className="symbol-badge symbol-badge-bottom bg-success" />
                    </div>

                    <h4 className="font-weight-bold my-2">
                        {localStorage.getItem('fullname') ? localStorage.getItem('fullname') : currentUser.email}
                    </h4>
                    <div className="text-muted mb-2">Shop Owner</div>
                    <span className="label label-light-warning label-inline font-weight-bold label-lg">Hoạt động</span>
                    <div className="mt-10">
                        <Link to="/profile" className="btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 text-center btn-block">
                            <i className="fad fa-user-circle mr-1" />
                            Xem hồ sơ
                        </Link>
                        <Link to="/changepw" className="btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 text-center btn-block">
                            <i className="fad fa-lock-alt mr-1" />
                            Thay đổi mật khẩu
                        </Link>
                        <Signout />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default InforSideRight;
