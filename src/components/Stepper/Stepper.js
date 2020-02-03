import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Stepper(){
    // Using hooks to access redux and saga
    let dispatch = useDispatch();
    let questionData = useSelector(state => state.question);

    useEffect(() => {
        dispatch({type: `GET_QUESTION`});
        }, [dispatch]);

    return(
        <div>
            {JSON.stringify(questionData)}
            Questions populate here: {questionData}
        </div>
    );
}