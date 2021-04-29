import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function ChartCard(props) {
    const { style, title, subTitle, total, percent, processBarColor } = props;

    return (
        <div className="card card-custom bgi-no-repeat card-stretch gutter-b" style={style}>
            <div className="card-body my-4">
                <div className="d-block card-title font-weight-bolder font-size-lg">{title}</div>
                <div className="font-weight-bold text-muted font-size-sm">
                    <span className="font-weight-bold font-size-h2 mr-2">{total}</span> {subTitle}
                </div>
                <div className="progress progress-xs mt-7 bg-secondary-o-70">
                    <div className={`progress-bar progress-bar-striped progress-bar-animated ${processBarColor}`} style={{ width: percent }} />
                </div>
            </div>
        </div>
    );
}

ChartCard.propTypes = {
    style: PropTypes.object,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    total: PropTypes.string,
    percent: PropTypes.string,
    processBarColor: PropTypes.string,
};
ChartCard.defaultProps = {
    style: null,
    title: '',
    subTitle: '',
    total: '',
    percent: '',
    processBarColor: '',
};

export default ChartCard;
