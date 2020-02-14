import React, {useState, useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
  // Set react router hook
  const userData = useSelector(state => state.user.admin);
  let calcData = useSelector(state => state.calcStatus);
  const history = useHistory();
  const dispatch = useCallback(useDispatch());
  const questionData = useSelector(state=>state.question.calculator_id);
  const [breakEven, setBreakEven] = useState('circle-btn');
  const [home, setHome] = useState('circle-btn');
  const [lever, setLever] = useState('circle-btn');
  const [price, setPrice] = useState('circle-btn');
  const [profile, setProfile] = useState('circle-btn');
  const [renderLever, setRenderLever] = useState(null);
  const [renderPrice, setRenderPrice] = useState(null);
  const [renderBreak, setRenderBreak] = useState(null);

  // Run on component mount
  useEffect(()=>{
    if(calcData[calcData.findIndex(element => element.calculator_id === 1)]){
      setRenderLever(true);
    } else {
      setRenderLever(false);
    }
    if(calcData[calcData.findIndex(element => element.calculator_id === 2)]){
      console.log('BREAK HAPPENS?');
      setRenderBreak(true);
    } else {
      setRenderBreak(false);
    }
    if(calcData[calcData.findIndex(element => element.calculator_id === 3)]){
      console.log('PRICE HAPPENS');
      setRenderPrice(true);
    } else {
      setRenderPrice(false);
    }
    if(history.location.pathname === '/'){
      setHome('circle-btn-active');
      setBreakEven('circle-btn');
      setLever('circle-btn');
      setPrice('circle-btn');
      setProfile('circle-btn');
    }
    else if(history.location.pathname === '/user'){
      setProfile('circle-btn-active');
      setBreakEven('circle-btn');
      setHome('circle-btn');
      setLever('circle-btn');
      setPrice('circle-btn');
    }
    else if(questionData === 1){
      setLever('circle-btn-active');
      setBreakEven('circle-btn');
      setHome('circle-btn');
      setPrice('circle-btn');
      setProfile('circle-btn');
    }
    else if(questionData === 2){
      setBreakEven('circle-btn-active');
      setHome('circle-btn');
      setLever('circle-btn');
      setPrice('circle-btn');
      setProfile('circle-btn');
    }
    else if(questionData === 3){
      setPrice('circle-btn-active');
      setBreakEven('circle-btn');
      setHome('circle-btn');
      setLever('circle-btn');
      setProfile('circle-btn');
    }
  }, [questionData, userData, calcData, history.location.pathname]);

  // Log user out, push history to login page
  const logout = () => {
    dispatch({type: 'LOGOUT'});
    dispatch({type: 'CLEAR_ALL'});
    history.push('/');
  }

  // Push history to user profile
  const pushHistoryToHome = () => {
    if(userData === true){
      history.push('/admin');
    }
    else {
      history.push('/new-user');
    }
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
      <button className={`nav-btn ${home}`} onClick={pushHistoryToHome}>
        Home <br /> Page
      </button>
      {renderBreak ? 
        null 
        :
        <button className={`nav-btn ${breakEven}`} onClick={()=>setStart(2)}>
          Break Even Calculator
        </button>
      }
      {renderLever ? 
        null 
        : 
        <button className={`nav-btn ${lever}`} onClick={()=>setStart(1)}>
          Profit Lever Calculator
        </button>
      }
      {renderPrice ? 
        null 
        : 
        <button className={`nav-btn ${price}`} onClick={()=>setStart(3)}>
          Price Setting Calculator
        </button>
      }
      <button className={`nav-btn ${profile}`} onClick={pushHistoryToProfile}>
        Profile <br /> Page
      </button>
      <button className='circle-btn nav-btn' onClick={logout}>
        Log <br /> Out
      </button>
    </center>
  );
}