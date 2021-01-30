import React from 'react';
import '../../styles/List.css';

const List = ({data: dataList, component: Component, deleteFunction, refresh}) => {
    return <div className="list">
        {dataList.map(data => {
            return <Component key={data.id} data={data} deleteElement={deleteFunction} refresh={refresh}/>
        })}
    </div>;

};

export default List;
