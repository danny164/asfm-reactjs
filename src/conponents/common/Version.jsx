import React from 'react';
import moment from 'moment';

function Version() {
    return <section className="d-none d-md-block sticky-version">{moment().year()}© The Night Owl</section>;
}

Version.propTypes = {};

export default Version;
