import React from 'react'

const FurnitureImage = (props) => {
    const { record } = props;
    console.log(record);
    return (
        <div>
            <img src={`/images/furniture/${record.params.image}`} alt="image" width="100"/>
        </div>
    )
}

export default FurnitureImage