import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Stepper(){

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: `GET_QUESTIONS`});
        }, [dispatch]);

    return(
        <div>
        </div>
    );
}

