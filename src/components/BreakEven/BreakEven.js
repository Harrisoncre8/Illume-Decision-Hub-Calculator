import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios'
import './BreakEven.css';
import Nav from '../Nav/Nav';

export default function BreakEven() {
  // States
  const [price, setPrice] = useState('');
  const [paths, setPaths] = useState([]);
  const [splits, setSplits] = useState({});
  const [splitPath, setSplitPath] = useState({});

  // Connects to redux
  const inputData = useSelector(state => state.input);
  const userCheckboxes = useSelector(state=>state.userCheckboxes);
  const dispatch = useCallback(useDispatch(), []);
  const user = useSelector(state => state.userInfo);

  // Dynamically calculates the break even point depending on settings
  useEffect(() => {
    const input8First = inputData[8] && +inputData[8]['Labor'];
    const input8Second = inputData[8] && +inputData[8]['Labor2'];
    let directCosts = +splitPath[7] === 7 ?
      +inputData[3] || 0 :
      ((input8First || 0) * (input8Second || 0)) + 
      (+inputData[9] || 0);

    let indirectCosts = +splitPath[22] === 8 ?
      +inputData[4] :
      (+inputData[10] || 0) + (+inputData[11] || 0) + (+inputData[12] || 0) + 
      (+inputData[13] || 0) + (+inputData[14] || 0) + (+inputData[15] || 0) + 
      (+inputData[16] || 0) + (+inputData[17] || 0) + (+inputData[18] || 0) + 
      (+inputData[19] || 0) + (+inputData[20] || 0) + (+inputData[21] || 0) + 
      (+inputData[23] || 0) + (+inputData[24] || 0) + (+inputData[25] || 0);

    let divisor = +splitPath[1] === 14 ? 1 : +inputData[5] || 1;

    setPrice(((+directCosts || 0) + (+indirectCosts || 0)) / (divisor));
  }, [inputData, splitPath]);

  // Gets the questions and splits for the given results page
  // This could be a saga, but I found it fine to just have it here
  useEffect(() => {
    Axios.get('/api/question/results/' + 2).then(response => {
      let temp = response.data.reduce((acum, arr) => {
        if (arr.split) {
          let id = arr.id;
          let text = acum[id] && acum[id]['split_text'] ?
            [...acum[id]['split_text'], arr.split_text] : [arr.split_text];
          let next = acum[id] && acum[id]['split_next_id'] ?
            [...acum[id]['split_next_id'], arr.split_next_id] : [arr.split_next_id];
          delete arr.id;
          delete arr.split_text;
          delete arr.split_next_id;
          acum[id] = { ...arr };
          acum[id]['split_text'] = text;
          acum[id]['split_next_id'] = next;
        } else {
          let id = arr.id;
          delete arr.id;
          acum[id] = { ...arr };
        }
        return acum;
      }, {});
      setPaths(temp);
    });

    Axios.get('/api/question/splits/' + 2).then(response => {
      let temp = response.data.reduce((acum, arr) => {
        acum[arr.question_id] ? acum[arr.question_id].push(arr) : acum[arr.question_id] = [arr];
        return acum;
      }, {});
      setSplits(temp);
    }).catch(err => {
    });
  }, []);

  // Rearranges the response from the server to a JSON styled object
  useEffect(() => {
    if (Object.values(splits).length > 0) {
      const temp = {};
      if(Object.entries(splitPath).length === 0){
        Object.values(splits).forEach(arr => {
          temp[arr[0].question_id] = inputData[arr[0].question_id] || arr[0].next_id
        });
        setSplitPath(temp);
      }
    }
  }, [splits, splitPath, inputData]);

  // Adds class if input has a value, removes the class if input has no value
  // The class moves the label from inside to just above the text field
  const checkForValue = e => e.target.value ? e.target.classList.add('text-field-active') : e.target.classList.remove('text-field-active');

  // Handles the change of the radio button
  function radioChange(e, question) {
    let temp = { ...splitPath };
    temp[question] = Number(e.target.value);
    setSplitPath(temp);
  }

  // Dynamically renders the questions associated with the calculator in the order
  // they would appear in the stepper component
  function stepper(start) {
    // When a split in a path happens, this function handles the display of the options
    // and calls then next question based on which radio button is selected
    function splitter(split) {
      return (
        <>
          {
            splits[split] && userCheckboxes.findIndex(el => el.question_id === split) !== -1 ?
              <div className="max-width-container">
                <form>
                  {splits[split].map(radio => {
                    return (
                      <span key={radio.id}>
                        <div className="radio-wrapper">
                          <label className="radio-container">
                            {
                              user[0] && user[0].service && radio.split_text ?
                              radio.split_text.replace(/Product/g, 'Service') 
                              :
                              radio.split_text
                            }
                            <input
                              type='radio'
                              name="next"
                              value={radio.next_id}
                              checked={+splitPath[split] === +radio.next_id}
                              onChange={(e) => { radioChange(e, split) }}
                            />
                            <span className="radio-btn"></span>
                          </label>
                        </div>
                      </span>
                    );
                  })}
                </form>
              </div>
              :
              null
          }
          {
            splitPath[split.toString()] ?
              stepper(splitPath[split.toString()]) 
              :
              null
          }
        </>
      );
    }

    // Holds variables to avoid excessive &'s  
    let next = paths[start] && paths[start].next_id;
    let doesSplit = paths[start] && paths[start].split;
    let questionId = paths[start] && paths[start].question_id;

    // Returns the question text and input field if the user has it associated with their profile
    return (
      <div className="max-width-container">
        <div className="align-left">
          {
            userCheckboxes.findIndex(el => el.question_id === (questionId)) !== -1 ?
              <p className="results-text">
                {
                  user[0] && user[0].service &&  paths[start] && paths[start].question ?
                  paths[start].question.replace(/product/g, 'service') 
                  :
                  paths[start].question
                }
              </p>
              :
              null
          }
        </div>
        {doesSplit ?
          null 
          :
          userCheckboxes.findIndex(el => el.question_id === (questionId)) !== -1 ?
            <>
              <div className="text-field-container" key={questionId}>
                <input
                  className="text-field text-field-active"
                  type={paths[start] && paths[start].response_type}
                  name={paths[start] && paths[start].header}
                  value={
                    paths[start] && paths[start].question2 ?
                    inputData[questionId] && inputData[questionId][paths[start] && paths[start].header]
                    :
                    inputData[questionId]
                  } 
                  onChange={
                    (e) => {
                      if(paths[start] && paths[start].question2){
                        dispatch({
                          type: 'ADD_INPUT_VALUE',
                          payload: {
                            key: questionId,
                            value: {
                              [e.target.name]: e.target.value,
                              [e.target.name + '2']: inputData[questionId] && inputData[questionId][e.target.name + '2']
                            }
                          }
                        });
                      } else {
                        dispatch({
                          type: 'ADD_INPUT_VALUE',
                          payload: {
                            key: questionId,
                            value: e.target.value
                          }
                        });
                      }
                      checkForValue(e);
                    }
                  }
                />
                <label className="text-field-label">enter value</label>
                <div className="text-field-mask stepper-mask"></div>
              </div>
              {
                // for labor rates really but there for scalability.  It lets you pair
                // two questions together
                paths[start] && paths[start].question2 ? 
                  <>
                    <p className="results-text">
                      {
                        user[0] && user[0].service && paths[start] && paths[start].question2 ?
                        paths[start].question2.replace(/product/g, 'service') 
                        :
                        paths[start].question2
                      }
                    </p>
                    <div className="text-field-container" key={questionId}>
                      <input
                        className="text-field text-field-active"
                        type={paths[start] && paths[start].response_type2}
                        value={inputData[questionId] && inputData[questionId][paths[start] && paths[start].header + '2']}
                        name={paths[start] && paths[start].header + '2'}
                        onChange={
                          (e) => {
                            dispatch({
                              type: 'ADD_INPUT_VALUE',
                              payload: {
                                key: questionId,
                                value: {
                                  [e.target.name]: e.target.value,
                                  [paths[start] && paths[start].header]: inputData[questionId] && inputData[questionId][paths[start] && paths[start].header]
                                }
                              }
                            });
                            checkForValue(e);
                          }
                        }
                      />
                      <label className="text-field-label">enter value</label>
                      <div className="text-field-mask stepper-mask"></div>
                    </div>
                  </> 
                  :
                  null
              }
            </>
            :
            null
        }
        {
          // If there's a next question, it then checks if this questions splits.
          // The path has a null value for next if it is the end of the path.
          // If this question splits, it calls splitter to handle displaying
          // radio buttons and their selections.  Null stops the recursion and
          // doesn't display any new text.
          next ?
            doesSplit ?
              splitter(questionId) 
              :
              stepper(next)
            :
            null // for next?
        }
      </div>
    );
  }

  return (
    <center>
      <Nav />
      <div className="main-container">
        <div className="top-card-container">
          <h1 className="main-heading">Break Even Pricing</h1>
          <div className="data-result">
            <h3 className="data-result-heading">Result</h3>
            <p>
              Your break even price is 
              {' ' + price.toLocaleString("en-US", { style: "currency", currency: 'USD' })}.
            </p>
            <br />
            <p>
              You must sell your product at a price higher than 
              {' ' + price.toLocaleString("en-US", { style: "currency", currency: 'USD' })} to make a profit.
            </p>
          </div>
          {stepper(6)}
        </div>
      </div>
    </center>
  );
}