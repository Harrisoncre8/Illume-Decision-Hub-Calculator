import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Stepper(){
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: `GET_QUESTION`});
        }, [dispatch]);

    return(
        <div>
            Questions populate here: 
        </div>
    );
}

