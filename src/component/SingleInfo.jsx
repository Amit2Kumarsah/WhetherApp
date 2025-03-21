// Desc: SingleInfo component to display single information in the weather application.
import React from 'react';

function SingleInfo({ text, info }) {
    return (
        <div style={{ margin: '10px 0', fontSize: '18px', color: '#333' }}>
            <span style={{ fontWeight: 'bold', marginRight: '10px' }}>{text}:</span>
            <span>{info}</span>
        </div>
    );
}

export default SingleInfo;