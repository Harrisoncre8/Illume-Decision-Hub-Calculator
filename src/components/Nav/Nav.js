import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-awesome-modal';
import './Nav.css';

export default function Nav(){
    // react router hook
    let history = useHistory();
    let dispatch = useDispatch();
    let userData = useSelector(state => state.admin.adminUserInfo);
    // let industryData = useSelector(state => state.industry);
    const [modal, setModal] = useState(false);

    useEffect(() => {
      dispatch({type: `GET_ADMIN_USER_INFO`});
      dispatch({type: `GET_INDUSTRY`});
    }, [dispatch]);

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
            <input type="button" value="Edit Profile" onClick={() => openModal()} />
            <Modal
                    visible={modal}
                    width="400"
                    height="300"
                    effect="fadeInUp"
                    onClickAway={() => closeModal()}
                >
                    <h1 className="main-heading admin-user-heading">User Information</h1>
                    <table className="admin-user-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Company</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Industry</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userData.map((user, i) => 
                          <tr key={i}>
                            <td>{user.name}</td>
                            <td>{user.company}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>{user.industry}</td>
                            <td className="admin-edit-user-cell">Edit</td>
                          </tr>
                        )}
                        </tbody>
                    </table>
                    <div className="modal-btn-container">
                      <button className="normal-btn" href="javascript:void(0);" 
                       onClick={() => closeModal()}>Close</button>
                    </div>
                </Modal>
        </div>
    );
}

