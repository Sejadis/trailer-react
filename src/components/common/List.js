import React from 'react';

const List = ({data: dataList , component: Component, deleteFunction}) => {
    return <ul>
        {dataList.map(data => {
            return <Component key={data.id} data={data} deleteElement={deleteFunction} />
        })}
    </ul>;

};

export default List;
