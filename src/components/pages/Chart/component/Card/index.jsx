import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function ChartCard(props) {
    const { style, title, subTitle, number, total, percent, labelCustom, processBarColor } = props;

    return (
        <div className="card card-custom bgi-no-repeat card-stretch gutter-b" style={style}>
            <div className="card-body my-4">
                <div className="d-block card-title font-weight-bolder font-size-lg">
                    {title}
                    <span className={`label label-sm ${labelCustom} label-rounded font-weight-bolder ml-1`}>{number}</span>
                </div>
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
    number: PropTypes.number,
    total: PropTypes.string,
    percent: PropTypes.string,
    labelCustom: PropTypes.string,
    processBarColor: PropTypes.string,
};
ChartCard.defaultProps = {
    style: null,
    title: '',
    subTitle: '',
    number: 0,
    total: '',
    percent: '',
    labelCustom: '',
    processBarColor: '',
};

export default ChartCard;
