import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

FeeRec.propTypes = {
    km: PropTypes.number
};

FeeRec.defaultProps = {
    km: 6
}

function shipFeeRec(km, setFeeRec) {
    let fee = []
    console.log(km)
    const price = Math.round(5 * km)
    fee.push(price * 1000)
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            if ((price % 10) < 5) {
                fee.push(price * 1000 + (5 - price % 10) * 1000)
            } else {
                fee.push(price * 1000 + (10 - price % 10) * 1000)
            }
        }
        else {
            if ((price % 10) < 5) {
                fee.push(price * 1000 + (5 - price % 10) * 1000 + i * 5000)
            } else {
                fee.push(price * 1000 + (10 - price % 10) * 1000 + i * 5000)
            }
        }
    }
    setFeeRec(fee)
    console.log(fee)
}


function FeeRec(props) {
    const { km1 } = props
    const [km, setKm] = useState(4)
    const [feeRec, setFeeRec] = useState([1, 2, 3])

    useEffect(() => {
        shipFeeRec(km, setFeeRec)
    }, [km])

    console.log(feeRec)
    return (
        <div>
            <button onClick={() => setKm(km + 0.1)}>Change km</button>
            <div>
                {feeRec && feeRec.map((data, index) =>
                    <div>
                        <button key={index} onClick={() => { }}>{data}</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FeeRec;