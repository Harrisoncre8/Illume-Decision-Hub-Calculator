import React, { useState } from 'react';
import { useEffect } from 'react';
import './ProfitLever.css';
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';

function ProfitLever() {
  const [paths, setPaths] = useState([]);
  const [splits, setSplits] = useState({});
  const [splitPath, setSplitPath] = useState({});

  const inputData = useSelector(state => state.input);
  const dispatch = useDispatch();


  const [price, setPrice] = useState(0);
  const [growth, setGrowth] = useState(0);
  const [directCostChange, setDirectCostChange] = useState(0);
  const [indirectCostChange, setIndirectCostChange] = useState(0);

  // MATH
  useEffect(() => {
    let directCosts = +splitPath[7] === 3?
      +inputData[3]:
      (+inputData[8] * +inputData[9]) + +inputData[10] + +inputData[11];
    
    let indirectCosts = +splitPath[24] === 4?
      + inputData[4]:
      +inputData[12] + +inputData[13] + +inputData[14] + +inputData[15] + +inputData[16] +
          +inputData[17] + +inputData[18] + +inputData[19] + +inputData[20] + +inputData[21] +
          +inputData[22] + +inputData[23];
    let divisor = +splitPath[1] === 2? 1: +inputData[5]
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
          let text = acum[id] && acum[id]['split_text'] ? [...acum[id]['split_text'], arr.split_text] : [arr.split_text]
          let next = acum[id] && acum[id]['split_next_id'] ? [...acum[id]['split_next_id'], arr.split_next_id] : [arr.split_next_id]
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
      }, {})
      setPaths(temp);
    })

    Axios.get('/api/question/splits/' + 1).then(response => {
      let temp = response.data.reduce((acum, arr) => {
        acum[arr.question_id] ? acum[arr.question_id].push(arr) : acum[arr.question_id] = [arr]
        return acum;
      }, {})
      setSplits(temp);
    }).catch(err => {
      console.log(err);
    });
  }, [])

  useEffect(() => {
    if (Object.values(splits).length > 0) {
      const temp = {}
      Object.values(splits).forEach(arr => {
        temp[arr[0].question_id] = arr[0].next_id
      })
      setSplitPath(temp);
    }
  }, [splits])

  function radioChange(e, question) {
    let temp = { ...splitPath };
    temp[question] = Number(e.target.value);
    setSplitPath(temp);
  }

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
                      <input
                        type='radio'
                        name="next"
                        value={radio.next_id}
                        checked={+splitPath[split] === +radio.next_id}
                        onChange={(e) => { radioChange(e, split) }}
                      />
                      {radio.split_text}
                    </span>
                  )
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
      )
    }
    let next = paths[start] && paths[start].next_id
    let doesSplit = paths[start] && paths[start].split
    let questionId = paths[start] && paths[start].question_id
    return (
      <div>
  <p>{paths[start] && paths[start].question} {paths[start] && paths[start].question_id}</p>
        {
          doesSplit ?
            null :
            <input
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
                  })
                }
              }
            />}
        {
          next ?
            doesSplit ?
              splitter(questionId) :
              stepper(next) :
            null // for next?
        }
      </div>
    )
  }
  return (
    <center>
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
  )
}

export default ProfitLever;