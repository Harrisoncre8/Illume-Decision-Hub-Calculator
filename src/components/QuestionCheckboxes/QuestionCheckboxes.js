import React, { useEffect, useCallback, useState } from 'react';
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

  useEffect(()=>{
    if(userCheckboxes[0] && userCheckboxes[0].user_id){
      const holder = {};
      userCheckboxes.forEach(el=>{
        holder[el.question_id] = true;
      });
      setChecked(holder);
    } else if (Array.isArray(questions)) {
      const state = questions.reduce((acum,arr)=>{
        if(arr.split){
          acum[arr.id] = true;
        }
        return acum;
      },{})
      setChecked(state);
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
    setChecked(holder);
  }

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
          {Array.isArray(questions)? 
            questions.map(question=>{
              if(!question.sub_questions && !question.split && question.header !== 'Product/Service Price' && question.header !== 'Revenue' && question.header !== 'Number of Sales'){
                return(
                  <div key={question.id}>
                    <div>
                      <label className="checkbox-container">{question.header}
                        <input 
                          type='checkbox' checked={checked[question.id]} 
                          onChange={
                            ()=>{
                              toggleChecked(question.id)
                            }
                          } 
                        />
                        <span className="checkbox-check"></span>
                      </label>
                    </div>
                    {questions.map(subQuestion=>{
                      if(subQuestion.sub_questions===question.id){
                        return(
                          <div key={subQuestion.id}>
                            <label className="checkbox-container">{subQuestion.header}
                              <input type='checkbox' checked={checked[subQuestion.sub_questions] && checked[subQuestion.id]} onChange={()=>toggleChecked(subQuestion.id)} />
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