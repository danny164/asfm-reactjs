import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Rating from '@material-ui/lab/Rating';
import React, { useState } from 'react';

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
    const [value, setValue] = useState();
    const [hover, setHover] = useState(-1);

    const handleSubmit = () => {
        // do something
    };
    return (
        <>
            <div className="d-flex flex-column align-items-center">
                <div className="title text-chartjs mb-3">Đánh giá cho tài xế bạn nhé !</div>
                <StyledRating
                    name="customized-color"
                    defaultValue={0}
                    precision={1}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    icon={<FavoriteIcon fontSize="inherit" />}
                />
                {value !== null && (
                    <div className="text-warning" ml={2}>
                        {labels[hover !== -1 ? hover : value]}
                    </div>
                )}
            </div>
        </>
    );
}

CustomRating.propTypes = {};

export default CustomRating;
