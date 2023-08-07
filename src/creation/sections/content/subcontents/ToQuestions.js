import React from 'react'
import Question from './Question'

const ToQuestions = (props) => {
    let fromProps = props.data;
    return (
        <>
            {fromProps.map((que) => (
                <Question data={que} compID={props.data.id} lesson_id={props.data.lesson_id} />
            ))}
        </>
    )
}

export default ToQuestions