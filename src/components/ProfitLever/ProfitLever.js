import React, { useState, useCallback } from 'react';
import { useEffect } from 'react';
import './ProfitLever.css';
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import Nav from '../Nav/Nav';

export default function ProfitLever() {

  // States
  const [paths, setPaths] = useState([]);
  const [splits, setSplits] = useState({});
  const [splitPath, setSplitPath] = useState({});
  const [price, setPrice] = useState(0);
  const [growth, setGrowth] = useState(0);
  const [directCostChange, setDirectCostChange] = useState(0);
  const [indirectCostChange, setIndirectCostChange] = useState(0);

  // Connects to redux
  const inputData = useSelector(state => state.input);
  const userCheckboxes = useSelector(state=>state.userCheckboxes);
  const dispatch = useCallback(useDispatch(), []);


  // Dynamically calculates the profit lever depending on settings
  useEffect(() => {
    let directCosts = +splitPath[7] === 3 ?
      +inputData[3] :
      ((+inputData[8] || 0) * (+inputData[9] || 0)) + (+inputData[10] || 0) + (+inputData[11] || 0);

    let indirectCosts = +splitPath[23] === 4 ?
      + inputData[4] :
      (+inputData[12] || 0) + (+inputData[13] || 0) + (+inputData[14] || 0) +
      (+inputData[15] || 0) + (+inputData[16] || 0) + (+inputData[17] || 0) +
      (+inputData[18] || 0) + (+inputData[19] || 0) + (+inputData[20] || 0) +
      (+inputData[21] || 0) + (+inputData[22] || 0);

    let divisor = +splitPath[1] === 2 ? 1 : +inputData[5] || 1;

    setPrice(
      (
        (
          (+inputData[2] * 1.01 - directCosts - indirectCosts) /
          (+inputData[2] - directCosts - indirectCosts)
        ) - 1
      ) * 100 / divisor
    );
    setGrowth(
      (
        (
          (
            (+inputData[2] * 1.01 - directCosts * 1.01) - indirectCosts) /
          (+inputData[2] - directCosts - indirectCosts)
        ) - 1
      ) * 100 / divisor
    );
    setDirectCostChange(
      (
        (
          (+inputData[2] - (directCosts * .99) - indirectCosts) /
          (+inputData[2] - directCosts - indirectCosts)
        ) - 1
      ) * 100 / divisor
    );
    setIndirectCostChange(
      (
        (
          (+inputData[2] - directCosts - (indirectCosts * .99)) /
          (+inputData[2] - directCosts - indirectCosts)
        ) - 1
      ) * 100 / divisor
    );
  }, [inputData, splitPath]);

  // Gets the questions and splits for the given results page
  useEffect(() => {
    Axios.get('/api/question/results/' + 1).then(response => {
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

    Axios.get('/api/question/splits/' + 1).then(response => {
      let temp = response.data.reduce((acum, arr) => {
        acum[arr.question_id] ? acum[arr.question_id].push(arr) : acum[arr.question_id] = [arr];
        return acum;
      }, {});
      setSplits(temp);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  // Rearranges the response from the server to a JSON styled object
  useEffect(() => {
    if (Object.values(splits).length > 0) {
      const temp = {};
      Object.values(splits).forEach(arr => {
        temp[arr[0].question_id] = inputData[arr[0].question_id] || arr[0].next_id
      })
      setSplitPath(temp);
    }
  }, [splits]);

  // Adds class if input has a value, removes the class if input has no value
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
    function splitter(split) {
      return (
        <>
          {
            splits[split] ?
              <form>
                {splits[split].map(radio => {
                  return (
                    <span key={radio.id}>
                      <div className="radio-wrapper">
                        <label className="radio-container">{radio.split_text}
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
              </form> :
              null
          }
          {
            splitPath[split.toString()] ?
              stepper(splitPath[split.toString()]) :
              null
          }
        </>
      );
    }
    
    let next = paths[start] && paths[start].next_id;
    let doesSplit = paths[start] && paths[start].split;
    let questionId = paths[start] && paths[start].question_id;

    return (
      <div className="max-width-container">
        <div className="align-left">
          {
            userCheckboxes.findIndex(el => el.question_id === (paths[start] && paths[start].question_id)) !== -1 ?
              <p className="results-text">{paths[start] && paths[start].question}</p>:
              null
          }
        </div>
        {doesSplit ?
          null :
          userCheckboxes.findIndex(el => el.question_id === (paths[start] && paths[start].question_id)) !== -1 ?
            <div className="text-field-container" key={paths[start] && paths[start].question_id}>
              <input
                className="text-field text-field-active"
                
                type={paths[start] && paths[start].response_type}
                value={inputData[questionId]}
                onChange={
                  (e) => {
                    dispatch({
                      type: 'ADD_INPUT_VALUE',
                      payload: {
                        key: questionId,
                        value: e.target.value
                      }
                    });
                    checkForValue(e);
                  }
                }
              />
              <label className="text-field-label">enter value</label>
              <div className="text-field-mask stepper-mask"></div>
            </div> :
            null
        }
        {
          next ?
            doesSplit ?
              splitter(questionId) :
              stepper(next) :
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
          <h1 className="main-heading">Define Profit Levers</h1>
          {stepper(1)}
          <div className="data-result">
            <h3 className="data-result-heading">Result</h3>
            <p>A 1% improvement in price will deliver {isNaN(price.toFixed(1))? 0 : price.toFixed(1)}% improvement in profit.</p>
            {/* <p>This translates to $x more profit in your pocket per year</p> */}
            <br />
            <p>A 1% increase in sales will deliver {isNaN(growth.toFixed(1))? 0 : growth.toFixed(1)}% improvement in profit.</p>
            {/* <p>This translate into $x more profit in your pocket per year</p> */}
            <br />
            <p>A 1% reduction in direct cost will deliver {isNaN(directCostChange.toFixed(1))? 0 : directCostChange.toFixed(1)}% improvement in profit.</p>
            {/* <p>This translates into $x more profit in your pocket per year</p> */}
            <br />
            <p>A 1% reduction in indirect costs will deliver {isNaN(indirectCostChange.toFixed(1))? 0 : indirectCostChange.toFixed(1)}% improvement in profit.</p>
            {/* <p>This translates into $x more profit in your pocket each year</p> */}
          </div>
        </div>
      </div>
    </center>
  );
}