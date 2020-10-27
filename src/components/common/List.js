import React from 'react';

const List = ({data: dataList, component: Component, deleteFunction, refresh}) => {
    return <ul>
        {dataList.map(data => {
            return <Component key={data.id} data={data} deleteElement={deleteFunction} refresh={refresh}/>
        })}
    </ul>;

};

export default List;
