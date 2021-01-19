import React from 'react';

const Modal = ({content: Content}) => {
    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#88888855",
            position: "absolute"
        }}>
            {Content != null ? <Content/> : null}
        </div>
    );
};

export default Modal;
