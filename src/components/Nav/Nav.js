import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-awesome-modal';
import './Nav.css';

export default function Nav(){
    // react router hook
    let history = useHistory();
    let dispatch = useDispatch();
    // let questionData = useSelector(state => state);
    const [modal, setModal] = useState(false);

    useEffect(() => {
      dispatch({type: `GET_ADMIN_USER_INFO`})
    });

    // Change state to open modal
    const openModal = () => {
        setModal(true);
    }
    // change state to close modal
    const closeModal = () => {
        setModal(false);
    }

    return(
        <div className='nav-div'>
            <button className='circle-btn' onClick={() => history.push('/break-even')}>
                Break Even Calculator</button>
            <button className='circle-btn' onClick={() => history.push('/profit-lever')}>
                Profit Lever Calculator</button>
            <button className='circle-btn' onClick={() => history.push('/price-setting')}>
                Price Setting Calculator</button>
            <button className='circle-btn' onClick={() => history.push('/')}>
                Log <br/> Out</button>
            <input type="button" value="Open" onClick={() => openModal()} />
            <Modal 
                    visible={modal}
                    width="400"
                    height="300"
                    effect="fadeInUp"
                    onClickAway={() => closeModal()}
                >
                    <div>
                        <h1>Title</h1>
                        <p>Some Contents</p>
                        <a href="javascript:void(0);" onClick={() => closeModal()}>Close</a>
                    </div>
                </Modal>
        </div>
    );
}

