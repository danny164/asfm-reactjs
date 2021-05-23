import Footer from 'components/common/Footer';
import Header from 'components/common/Header';
import { getDownloadUrl } from 'context/Upload';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import EditProfile from './Profile/EditProfile';
import InfoProfile from './Profile/InfoProfile';

MainProfile.propTypes = {
    user: PropTypes.object,
    edit: PropTypes.func,
};

MainProfile.defaultProps = {
    user: null,
    edit: null,
};

function MainProfile(props) {
    const { user, edit } = props;

    const { url } = useRouteMatch();

    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        getDownloadUrl(user.uid).then((url) => !!url && setImageUrl(url));
    }, [user.uid]);

    return (
        <main className="d-flex flex-column flex-row-fluid wrapper">
            <Header />

            <section className="content d-flex flex-column flex-column-fluid">
                {/* subheader */}
                <div className="subheader py-2 py-lg-6 subheader-transparent">
                    <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
                        {/* wrap breadcrumb */}
                        <div className="d-flex align-items-center flex-wrap mr-1">
                            <div className="d-flex align-items-baseline flex-wrap mr-5">
                                <h5 className="text-dark font-weight-bold my-1 mr-5">Cài đặt tài khoản</h5>
                                {/* breadcrumb */}
                                <ul className="breadcrumb font-weight-bold p-0 my-2 font-size-sm">
                                    <li className="breadcrumb-item">
                                        <Link to="/home" className="text-muted">
                                            Trang chủ
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        <Link to="/profile" className="text-muted">
                                            Xem hồ sơ
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* end wrap breadcrumb */}
                    </div>
                </div>
                {/* core content */}

                <Switch>
                    <Route exact path={url}>
                        <InfoProfile user={user} imageUrl={imageUrl} />
                    </Route>

                    <Route path={`${url}/edit`}>
                        <EditProfile user={user} imageUrl={imageUrl} edit={edit} />
                    </Route>
                </Switch>
            </section>
            <Footer />
        </main>
    );
}
export default MainProfile;
