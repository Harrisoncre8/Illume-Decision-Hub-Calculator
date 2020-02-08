import React, { useState } from 'react';
import { useEffect } from 'react';
import './ProfitLever.css';
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import Nav from '../Nav/Nav';

function ProfitLever() {
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
  const dispatch = useDispatch();


  // Dynamically calculates the profit lever depending on settings
  useEffect(() => {
    let directCosts = +splitPath[7] === 3 ?
      +inputData[3] :
      ((+inputData[8] || 0) * (+inputData[9] || 0)) + (+inputData[10] || 0) + (+inputData[11] || 0);

    let indirectCosts = +splitPath[24] === 4 ?
      + inputData[4] :
      (+inputData[12] || 0) + (+inputData[13] || 0) + (+inputData[14] || 0) +
      (+inputData[15] || 0) + (+inputData[16] || 0) + (+inputData[17] || 0) +
      (+inputData[18] || 0) + (+inputData[19] || 0) + (+inputData[20] || 0) +
      (+inputData[21] || 0) + (+inputData[22] || 0) + (+inputData[23] || 0);

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
    Axios.get('/api/question/all/' + 1).then(response => {
      let temp = response.data.reduce((acum, arr) => {
        if (arr.split) {
          let id = arr.id
          let text = acum[id] && acum[id]['split_text'] ?
            [...acum[id]['split_text'], arr.split_text] : [arr.split_text]
          let next = acum[id] && acum[id]['split_next_id'] ?
            [...acum[id]['split_next_id'], arr.split_next_id] : [arr.split_next_id]
          delete arr.id
          delete arr.split_text;
          delete arr.split_next_id;
          acum[id] = { ...arr };
          acum[id]['split_text'] = text;
          acum[id]['split_next_id'] = next;
        } else {
          let id = arr.id
          delete arr.id
          acum[id] = { ...arr }
        }
        return acum;
      }, {});
      setPaths(temp);
    });

    Axios.get('/api/question/splits/' + 1).then(response => {
      let temp = response.data.reduce((acum, arr) => {
        acum[arr.question_id] ? acum[arr.question_id].push(arr) : acum[arr.question_id] = [arr]
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
      const temp = {}
      Object.values(splits).forEach(arr => {
        temp[arr[0].question_id] = arr[0].next_id
      });
      setSplitPath(temp);
    }
  }, [splits]);

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
    let next = paths[start] && paths[start].next_id
    let doesSplit = paths[start] && paths[start].split
    let questionId = paths[start] && paths[start].question_id

    return (
      <div>
        <p className="results-text">{paths[start] && paths[start].question}</p>
        {doesSplit ?
          null 
          :
          <div className="text-field-container">
            <input
              className="text-field"
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
                }
              }
            />
            <label className="text-field-label">enter value</label>
            <div className="text-field-mask stepper-mask"></div>
          </div>
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
        <h1 className="main-heading">Define Profit Levers</h1>
        {stepper(1)}
        <div className="data-result">
          <h3 className="data-result-heading">Result</h3>
          <p>A 1% improvement in price will deliver {price.toFixed(1)}% improvement in profit.</p>
          {/* <p>This translates to $x more profit in your pocket per year</p> */}
          <br />
          <p>A 1% increase in sales will deliver {growth.toFixed(1)}% improvement in profit.</p>
          {/* <p>This translate into $x more profit in your pocket per year</p> */}
          <br />
          <p>A 1% reduction in direct cost will deliver {directCostChange.toFixed(1)}% improvement in profit.</p>
          {/* <p>This translates into $x more profit in your pocket per year</p> */}
          <br />
          <p>A 1% reduction in indirect costs will deliver {indirectCostChange.toFixed(1)}% improvement in profit.</p>
          {/* <p>This translates into $x more profit in your pocket each year</p> */}
        </div>
      </div>
    </center>
  );
}

export default ProfitLever;