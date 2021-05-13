import React from 'react';

function Transfer(props) {
    return(
        <div className="transfer">
            <div className="transfer-item">
                <h2>Source Image</h2>
                <img className="transfer-item-image" src={props.content}/>
            </div>
            <div className="transfer-item">
                <h2>Style Reference</h2>
                <img className="transfer-item-image" src={props.style}/>
            </div>
            <div className="transfer-item">
                <h2>Transformed Image</h2>
                <img className="transfer-item-image" src={props.image}/>
            </div>
        </div>
    )
}

export default Transfer;