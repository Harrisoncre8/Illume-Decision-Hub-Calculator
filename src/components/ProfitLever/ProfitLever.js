import React, { useState } from 'react';
import { useEffect } from 'react';
import './ProfitLever.css';
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import Nav from '../Nav/Nav';

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
    setPrice(
      (
        (
          (inputData[2] * 1.01 - inputData[3] - inputData[4]) /
          (inputData[2] - inputData[3] - inputData[4])
        ) - 1
      ) * 100
    );
    setGrowth(
      (
        (
          (
            (inputData[2] * 1.01 - inputData[3] * 1.01) - inputData[4]) /
            (inputData[2] - inputData[3] - inputData[4])
        ) - 1
      ) * 100
    );
    setDirectCostChange(
      (
        (
          (inputData[2] - (inputData[3] * .99) - inputData[4]) /
          (inputData[2] - inputData[3] - inputData[4])
        ) - 1
      ) * 100
    );
    setIndirectCostChange(
      (
        (
          (inputData[2] - inputData[3] - (inputData[4] * .99)) / 
          (inputData[2] - inputData[3] - inputData[4])
        ) - 1
      ) * 100
    );
  }, [inputData]);

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
    console.log(temp);
    temp[question] = Number(e.target.value);
    console.log(temp);
    setSplitPath(temp);
  }

  function stepper(start) {
    function splitter(split) {
      console.log(splitPath[split.toString()]);
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
        <p>{paths[start] && paths[start].question}</p>
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
  )
}

export default ProfitLever;