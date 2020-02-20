import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './QuestionCheckboxes.css';

const QuestionCheckboxes = () => {
  // States
  const [checked, setChecked] = useState({});
  const [subQuestionCount, setSubquestionCount] = useState({});
  const [countChecked, setCountChecked] = useState({});
  const [totalSub, setTotalSub] = useState({});
  
  // Connects to redux
  const dispatch = useCallback(useDispatch(), []);
  const questions = useSelector(state=>state.question);
  const userCheckboxes = useSelector(state=>state.userCheckboxes);

  // Gets all the questions to be looped through later
  useEffect(()=>{
    dispatch({type: 'GET_ALL_QUESTIONS'});
  }, [dispatch]);

  useEffect(()=>{
    // If the user has save which questions they want at any point in the past,
    // it checks them for the user and adds it to the count under the major question's
    // ID.  If that count is ever 0, it disables the major question for that user.
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
      // If the user hasn't been here, we need to make sure questions is an array because
      // the stepper makes question an object.  After the question saga gets all the questions,
      // this becomes true and any question that has a split becomes marked true
      // behind the scenes so they aren't ever disabled after the user selects save.
    } else if (Array.isArray(questions)) {
      const state = questions.reduce((acum,arr)=>{
        if(!arr.sub_questions){
          acum[arr.id] = true;
        }
        return acum;
      },{});
      setChecked(state);
    }
    // This is where the count is checked.  It's not in the above if/else chain
    // because it needs to happen regardless of if the user has been here before.
    // It also needs to wait for the questions saga to get all the questions.
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

  // Handles checking the items
  function toggleChecked(id){
    let holder = {...checked};
    holder[id] = !checked[id];
    // Ensures the split is checked for direct costs and indirect costs
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
      setCountChecked(subHolder);
    }
    setChecked(holder);
  }

  // Adds to the major question count when a subquestion is checked
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

  // Toggles the major questions as long as one sub question is checked
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

  // Confirms that the user wants to save their new questions.  This can likely just
  // be a notification on the page to let the user know it's been saved as this
  // likely doesn't need a confirmation
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
                // This skips all the split questions because you shouldn't manually
                // toggle these on and off
                if(!question.sub_questions && !question.split && question.header !== 'Product/Service Price' && question.header !== 'Revenue' && question.header !== 'Number of Sales'){
                  // Major questions become headers for their sub questions
                  return(
                    <div key={question.id}>
                      <div>
                        <label className="checkbox-container">
                          <h3>{question.header}</h3>
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