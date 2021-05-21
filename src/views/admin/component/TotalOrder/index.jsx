import React, { useEffect, useState } from 'react';
import { realtime } from '../../../firebase';

TotalOrder.propTypes = {};

function TotalOrder(props) {
    const [data, setData] = useState();
    useEffect(() => {
        try {
            realtime.ref('OrderStatus/').on('value', (snapshot) => {
                if (snapshot) {
                    setData(snapshot.val());
                }
            });
        } catch (err) {
            console.log(err);
        }
    }, []);
    return (
        <div>
            <h1>Hello !</h1>
            {data &&
                Object.values(data).map((datas) => {
                    Object.values(datas).map((datass) => {
                        console.log(datass);
                    });
                })}
        </div>
    );
}

export default TotalOrder;
