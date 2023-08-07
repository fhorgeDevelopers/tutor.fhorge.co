import React from 'react'
import { Input } from './Input';

const Component = (props) => {
    return (
        <>
            {props.data.map((comp) => (
                <Input data={comp} key={comp.id} />
            ))}
        </>
    )
}

export default Component