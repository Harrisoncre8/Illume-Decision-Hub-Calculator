import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './QuestionCheckboxes.css';

const QuestionCheckboxes = () => {
  const dispatch = useCallback(useDispatch(), []);
  const questions = useSelector(state=>state.question);
  const userCheckboxes = useSelector(state=>state.userCheckboxes);

  useEffect(()=>{
    dispatch({type: 'GET_ALL_QUESTIONS'});
  }, [dispatch]);

  const [checked, setChecked] = useState({});
  const [subQuestionCount, setSubquestionCount] = useState({});
  const [countChecked, setCountChecked] = useState({});
  const [totalSub, setTotalSub] = useState({});

  useEffect(()=>{
    if(userCheckboxes[0] && userCheckboxes[0].user_id){
      const holder = {};
      userCheckboxes.forEach(el=>{
        holder[el.question_id] = true;
      });
      const subCount = {};
      userCheckboxes.forEach(el=>{
        if(questions[el.question_id - 1]){
          let subquestionID = questions[el.question_id - 1] && questions[el.question_id - 1].sub_questions;
          if(subquestionID){
            if(subCount[subquestionID]){
              subCount[subquestionID][el.question_id] = true;
            } else {
              subCount[subquestionID] = {[el.question_id]: true};
            }
          }
        }
      })
      setCountChecked(subCount);
      setChecked(holder);
    } else if (Array.isArray(questions)) {
      const state = questions.reduce((acum,arr)=>{
        if(!arr.sub_questions){
          acum[arr.id] = true;
        }
        return acum;
      },{});
      state[16] = true;
      state[18] = true;
      state[19] = true;
      setChecked(state);
    }
    if(Array.isArray(questions)){
      const count = questions.reduce((acum,arr)=>{
        if(arr.sub_questions){
          acum[arr.sub_questions] = acum[arr.sub_questions] ? acum[arr.sub_questions] + 1 : 1;
        }
        return acum;
      },{});
      setTotalSub(count);
    }
  },[questions,userCheckboxes]);

  function toggleChecked(id){
    let holder = {...checked};
    holder[id] = !checked[id];
    if(id === 3){
      holder[7] = checked[id];
    } else if (id === 4){
      holder[22] = checked[id];
    }
    if(questions[id-1] && questions[id-1].sub_questions){
      let subHolder = {...countChecked};
      let subID = questions[id-1].sub_questions;
      if(subHolder[subID]){
        subHolder[subID][id] = !countChecked[subID][id];
      } else {
        subHolder[subID] = {[id]: true};
      }
      // subHolder[subID][id] = !countChecked[questions[id] && questions[id].sub_questions][id] || true;
      setCountChecked(subHolder);
    }
    setChecked(holder);
  }

  useEffect(()=>{
    let holder = {};
    for(let key of Object.keys(countChecked)){
      let count = 0;
      for(let subKey of Object.keys(countChecked[key])){
        if(countChecked[key][subKey]){
          count++;
        }
      }
      holder[key] = count;
    }
    setSubquestionCount(holder);
  },[countChecked]);

  useEffect(()=>{
    let holder = {...checked};
    for(let key of Object.keys(totalSub)){
      if(!subQuestionCount[key]){
        if(key==='3'){
          holder[7] = false;
        }
        if(key==='4'){
          holder[22] = false;
        }
        holder[key] = false;
      } else {
        holder[key] = true;
        if(key==='3'){
          holder[7] = true;
        }
        if(key==='4'){
          holder[22] = true;
        }
      }
    }
    setChecked(holder);
  }, [totalSub, subQuestionCount]);

  function submit(e){
    e.preventDefault();
    let popup = window.confirm('Save your preferences?');
    if(popup){
      dispatch({type: 'SET_CHECKBOXES', payload: checked});
    }
  }

  return(
    <center>
      <h1>Which costs are relevant to you?</h1>
      <form onSubmit={(e)=>submit(e)}>
        <div className="questions-checkbox-container">
          {
            Array.isArray(questions)? 
              questions.map(question=>{
                if(!question.sub_questions && !question.split && question.header !== 'Product/Service Price' && question.header !== 'Revenue' && question.header !== 'Number of Sales'){
                  return(
                    <div key={question.id}>
                      <div>
                        <label className="checkbox-container"><h3>{question.header}</h3>
                          {/* <input 
                            type='checkbox' checked={checked[question.id]} 
                            onChange={
                              ()=>{
                                toggleChecked(question.id);
                              }
                            } 
                          />
                          <span className="checkbox-check"></span> */}
                        </label>
                      </div>
                      {questions.map(subQuestion=>{
                        if(subQuestion.sub_questions===question.id){
                          return(
                            <div key={subQuestion.id}>
                              <label className="checkbox-container">{subQuestion.header}
                                <input
                                  type='checkbox' 
                                  checked={checked[subQuestion.id]} 
                                  onChange={()=>toggleChecked(subQuestion.id)} />
                                <span className="checkbox-check"></span>
                              </label>
                            </div>
                          );
                        } 
                        else {
                          return(null);
                        };
                      })}
                    </div>
                  )} 
                  else {
                    return(null);
                  };
              })
              :
              null
          }
        </div>
        <button className="normal-btn questions-checkbox-btn" type="submit">Save</button>
      </form>
    </center>
  );
};

export default QuestionCheckboxes;