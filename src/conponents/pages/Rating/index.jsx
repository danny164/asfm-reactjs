import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Rating from '@material-ui/lab/Rating';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { realtime } from '../../../firebase';

CustomRating.propTypes = {
    shipper_id: PropTypes.string,
    post_id: PropTypes.string,
};

CustomRating.defaultProps = {
    shipper_id: '',
    post_id: '',
};

const labels = {
    1: 'Kém',
    2: 'Tạm được',
    3: 'Tốt',
    4: 'Rất tốt',
    5: 'Xuất sắc',
};

const StyledRating = withStyles({
    iconFilled: {
        color: '#ff6d75',
    },
    iconHover: {
        color: '#ff3d47',
    },
})(Rating);

function CustomRating(props) {
    const { shipper_id, post_id } = props;

    const [valueGet, setValueGet] = useState(0);
    const [hover, setHover] = useState(-1);

    console.log('post: ' + post_id + ' ship: ' + shipper_id);

    useEffect(() => {
        async function getRating() {
            await realtime.ref('Transaction/' + post_id).on('value', (snapshot) => {
                if (snapshot.val().rate) {
                    setValueGet(snapshot.val().rate);
                }
            });
        }
        getRating();
    }, []);

    async function ratingForShipper(val) {
        await realtime.ref('Ratting_Star/' + shipper_id).push({
            rate: val,
        });

        await realtime.ref('Transaction/' + post_id).update({
            rate: val,
        });
    }

    return (
        <>
            {console.log(valueGet)}
            <div className="d-flex flex-column align-items-center">
                {valueGet === 0 ? (
                    <div className="title text-chartjs mb-3">Đánh giá cho tài xế bạn nhé !</div>
                ) : (
                    <div className="title text-chartjs mb-3">Bạn đã đánh giá {valueGet} sao cho tài xế !</div>
                )}
                <StyledRating
                    name="customized-color"
                    defaultValue={0}
                    value={valueGet}
                    precision={1}
                    onChange={(event, newValue) => {
                        if (valueGet !== 0) {
                            return;
                        } else {
                            ratingForShipper(newValue);
                        }
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    icon={<FavoriteIcon fontSize="inherit" />}
                />
                {valueGet !== null && (
                    <div className="text-warning" ml={2}>
                        {labels[hover !== -1 ? hover : valueGet]}
                    </div>
                )}
            </div>
        </>
    );
}

export default CustomRating;
