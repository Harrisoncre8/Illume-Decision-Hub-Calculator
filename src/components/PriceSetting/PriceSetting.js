import React, { useState } from 'react';
import { useEffect } from 'react';
import './PriceSetting.css';
import Nav from '../Nav/Nav';
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';

export default function PriceSetting() {

  // States
  const [margin, setMargin] = useState('');
  const [userMargin, setUserMargin] = useState(0);
  const [productMargin, setProductMargin] = useState(0);
  const [industryNorm, setIndustryNorm] = useState(0);
  const [difference, setDifference] = useState(0);
  const [paths, setPaths] = useState([]);
  const [splits, setSplits] = useState({});
  const [splitPath, setSplitPath] = useState({});

  // Connects to Redux
  const inputData = useSelector(state => state.input);
  const industryData = useSelector(state => state.industry);
  let userID = useSelector(state => state.user.id);
  let userData = useSelector(state => state.userInfo);
  const dispatch = useDispatch();

  // Ensures that userInfo and industry data is in the reducer
  useEffect(() => {
    if (userID) {
      dispatch({ type: `GET_USER_INFO`, payload: userID });
      dispatch({ type: `GET_INDUSTRY` });
    }
  }, [userID, dispatch]);

  // Finds the users industry and sets it as the default choice
  useEffect(() => {
    if (userData.length > 0 && industryData) {
      setMargin(
        industryData[industryData.findIndex(el => el.industry === userData[0].industry)] &&
        industryData[industryData.findIndex(el => el.industry === userData[0].industry)].margin
      );
    }
  }, [userData, industryData]);
  

  // Dynamically calculates the price setting depending on settings
  useEffect(() => {
    let directCosts = +splitPath[7] === 10 ?
      +inputData[3] :
      ((+inputData[8] || 0) * (+inputData[9] || 0)) + (+inputData[10] || 0) + (+inputData[11] || 0);

    let indirectCosts = +splitPath[24] === 11 ?
      + inputData[4] :
      (+inputData[12] || 0) + (+inputData[13] || 0) + (+inputData[14] || 0) +
      (+inputData[15] || 0) + (+inputData[16] || 0) + (+inputData[17] || 0) +
      (+inputData[18] || 0) + (+inputData[19] || 0) + (+inputData[20] || 0) +
      (+inputData[21] || 0) + (+inputData[22] || 0) + (+inputData[23] || 0);

    let cost = directCosts + indirectCosts || 0;
    let price = +inputData[6] || 0;
    let totalSales = inputData[5] || 0;
    let iNorm = (cost / (1 - margin)).toFixed(2) || 0;
    let pm = +iNorm - cost || 0;
    let um = price - cost || 0;
    setIndustryNorm(+iNorm);
    setProductMargin(+pm.toFixed(2));
    setUserMargin(+um.toFixed(2));
    setDifference(+Math.abs(Math.ceil(totalSales * ((pm / um) - 1))) || 0);
  }, [margin, productMargin, userMargin, inputData, splitPath]);

  // Gets the questions and splits for the given results page
  useEffect(() => {
    Axios.get('/api/question/all/' + 3).then(response => {
      let temp = response.data.reduce((acum, arr) => {
        if (arr.split) {
          let id = arr.id;
          let text = acum[id] && acum[id]['split_text'] ? [...acum[id]['split_text'], arr.split_text] : [arr.split_text];
          let next = acum[id] && acum[id]['split_next_id'] ? [...acum[id]['split_next_id'], arr.split_next_id] : [arr.split_next_id];
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

    Axios.get('/api/question/splits/' + 3).then(response => {
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
        temp[arr[0].question_id] = arr[0].next_id
      });
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

    let next = paths[start] && paths[start].next_id;
    let doesSplit = paths[start] && paths[start].split;
    let questionId = paths[start] && paths[start].question_id;

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
                  checkForValue(e);
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
        <h1 className="main-heading">Price Setting</h1>
        <div className="inputs">
          <form>
            <select onChange={(event) => setMargin(event.target.value)} value={margin}>
              <option disabled>Select Industry</option>
              {industryData.map(industry => {
                return (
                  <option key={industry.id} value={industry.margin}>{industry.industry}</option>
                );
              })}
            </select>
          </form>
          {stepper(9)}
        </div>
        <div className="data-result">
          <h3 className="data-result-heading">Result</h3>

          <br />
          <p>Your Margin: ${userMargin} per unit</p>
          <br />
          <p>Industry Norm: ${industryNorm} per unit</p>
          <br />
          <p>Industry Margin: ${productMargin} per unit</p>
          <br />

          <p>
            Your price is
            {
              productMargin > userMargin ?
                ' lower than ' :
                productMargin < userMargin ?
                  ' higher than ' :
                  ' equal to '
            }
            industry norms
            <br />
            You will need to sell
            {' ' + difference + ' '}
            {
              productMargin >= userMargin ?
                ' more ' :
                ' less '
            }
            units to make the same revenue as the industry norm price would.</p>
        </div>
      </div>
    </center>
  );
}