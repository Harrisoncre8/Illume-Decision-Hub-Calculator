import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Nav.css';

export default function Nav() {

  // Set react router hook
  const history = useHistory();
  const dispatch = useDispatch();
  const questionData = useSelector(state=>state.question.calculator_id);
  const [breakEven, setBreakEven] = useState('');
  const [lever, setLever] = useState('');
  const [price, setPrice] = useState('');
  const [profile, setProfile] = useState('');

  // Run on component mount
  useEffect(()=>{
    if(history.location.pathname === '/user'){
      setProfile('circle-btn-active');
    }
    else if(questionData === 1){
      setLever('circle-btn-active');
      setBreakEven('');
      setPrice('');
    }
    else if(questionData === 2){
      setBreakEven('circle-btn-active');
      setLever('');
      setPrice('');
    }
    else if(questionData === 3){
      setPrice('circle-btn-active');
      setBreakEven('');
      setLever('');
    }
  }, [questionData]);

  // Log user out, push history to login page
  const logout = () => {
    dispatch({type: 'LOGOUT'});
    history.push('/');
  }

  // Push history to user profile
  const pushHistoryToProfile = () => history.push('/user');

  // Set stepper starting point
  const setStart = id => {
    dispatch({ type: 'CLEAR_PREVIOUS_QUESTION' });
    dispatch({type: 'GET_QUESTION', payload: {query: {start: id}}});
    history.push('/questionnaire');
  }

  return (
    <center>
      {/* <ul className="nav-ul">
        <li className="nav-li">Break Even</li>
        <li className="nav-li">Price Setting</li>
        <li className="nav-li">Profit Lever</li>
        <li className="nav-li">Profile</li>
        <li className="nav-li">Log Out</li>
      </ul> */}



      <button className={`circle-btn nav-btn ${breakEven}`} onClick={()=>setStart(2)}>
        Break Even Calculator
      </button>
      <button className={`circle-btn nav-btn ${lever}`} onClick={()=>setStart(1)}>
        Profit Lever Calculator
      </button>
      <button className={`circle-btn nav-btn ${price}`} onClick={()=>setStart(3)}>
        Price Setting Calculator
      </button>
      <button className={`circle-btn nav-btn ${profile}`} onClick={pushHistoryToProfile}>
        Profile <br /> Page
      </button>
      <button className='circle-btn nav-btn' onClick={logout}>
        Log <br /> Out
      </button>
    </center>
  );
}