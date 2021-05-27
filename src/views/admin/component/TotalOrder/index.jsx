import { realtime } from '../../../../firebase';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

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
        <>
            {data &&
                Object.values(data).map((datas) => {
                    Object.values(datas).map((datass) => {
                        console.log(datass);
                    });
                })}

            <DataTable title="Danh sách tất cả các đơn" />
        </>
    );
}

export default TotalOrder;
