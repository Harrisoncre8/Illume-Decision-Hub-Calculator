import React, { useState } from 'react';
import { useEffect } from 'react';
import './ProfitLever.css';
import Axios from 'axios'

function ProfitLever() {
  const [paths, setPaths] = useState([]);
  const [splits, setSplits] = useState({});
  const [splitPath, setSplitPath] = useState({});
  
  // Gets the questions and splits for the given results page
  useEffect(()=>{
    Axios.get('/api/question/all/'+1).then(response=>{
      let temp = response.data.reduce((acum, arr)=>{
        if(arr.split){
          let id = arr.id
          let text = acum[id] && acum[id]['split_text']? [...acum[id]['split_text'], arr.split_text]: [arr.split_text] 
          let next = acum[id] && acum[id]['split_next_id']? [...acum[id]['split_next_id'], arr.split_next_id]: [arr.split_next_id] 
          delete arr.id
          delete arr.split_text;
          delete arr.split_next_id;
          acum[id] = {...arr};
          acum[id]['split_text'] = text;
          acum[id]['split_next_id'] = next;
        } else {
          let id = arr.id
          delete arr.id
          acum[id] = {...arr}
        }
        return acum;
      },{})
      setPaths(temp);
    })

    Axios.get('/api/question/splits/'+1).then(response=>{
      let temp = response.data.reduce((acum,arr)=>{
        acum[arr.question_id]? acum[arr.question_id].push(arr): acum[arr.question_id] = [arr]
        return acum;
      },{})
      setSplits(temp);
    }).catch(err=>{
      console.log(err); 
    });
  },[])

  useEffect(()=>{
    if(Object.values(splits).length>0){
      const temp = {}
      Object.values(splits).forEach(arr=>{
        console.log(arr[0].question_id,arr[0].next_id)
        temp[arr[0].question_id] = arr[0].next_id
      })
      setSplitPath(temp);
    }
  },[splits])

  function stepper(start){
    function splitter(split){
      console.log(splitPath[split.toString()]);
      return (
        <>
          {
            splits[split]? 
              splits[split].map(radio=>{
                return(
                  <>
                    <input type='radio'/> {radio.split_text}
                  </>
                )
              }):
              null
          }
          {
            splitPath[split.toString()]? 
              stepper(splitPath[split.toString()]): 
              null
          }
        </>
      )
    }
    let next = paths[start] && paths[start].next_id
    let doesSplit = paths[start] && paths[start].split
    let questionId = paths[start] && paths[start].question_id
    return(
      <div>
        <p>{paths[start] && paths[start].question}</p>
        {doesSplit? null: <input />}
        {
          next?
            doesSplit?
              splitter(questionId):
              stepper(next):
            null // for next?
        }
      </div>
    )
  }
  return (
    <div style={{backgroundColor: 'white'}}>
      {stepper(1)}
      {JSON.stringify(splitPath)}
    </div>
  )

  // const [revenue, setRevenue] = useState('');
  // const [directCost, setDirectCost] = useState('');
  // const [indirectCost, setIndirectCost] = useState('');
  // const [price, setPrice] = useState(0);
  // const [growth, setGrowth] = useState(0);
  // const [directCostChange, setDirectCostChange] = useState(0);
  // const [indirectCostChange, setIndirectCostChange] = useState(0);
  
  // // Adds class if input has a value, removes the class if input has no value
  // const checkForValue = e => e.target.value ? e.target.classList.add('text-field-active') : e.target.classList.remove('text-field-active');
  
  // // Sets local state to current input value, adds or removes class based on input's value
  // const handleChange = (e, propName) => {
  //   propName(e.target.value);
  //   checkForValue(e);
  // }

  // useEffect(()=>{
  //   if(revenue !== '' && directCost !== '' && indirectCost !== ''){
  //     setPrice((((revenue * 1.01 - directCost - indirectCost)/(revenue - directCost - indirectCost))-1)*100);
  //     setGrowth(((((revenue * 1.01 - (directCost / revenue) * revenue * 1.01) - indirectCost)/(revenue - directCost - indirectCost))-1)*100);
  //     setDirectCostChange((((revenue - (directCost * .99) - indirectCost)/(revenue - directCost - indirectCost))-1)*100);
  //     setIndirectCostChange((((revenue - directCost - (indirectCost * .99))/(revenue - directCost - indirectCost))-1)*100);
  //   }
  // },[revenue, directCost, indirectCost]);


  // return (

  //   // place radio buttons here for users to change total products and single unit
  //   // just single unit right now
    
  //   <center>
  //     <div className="main-container">
  //       <h1 className="main-heading">Define Profit Levers</h1>
  //         <form>
  //           <div>
  //             <span>What are your Direct Costs?</span>
  //               <div className="lever-text-field-container">
  //                 <input 
  //                   className="text-field lever-text-field-direct-cost"
  //                   type="number" 
  //                   value={directCost}
  //                   onChange={(event)=>handleChange(event, setDirectCost)} 
  //                 />
  //                 <label className="text-field-label lever-label-direct-cost">direct costs</label>
  //                 <div className="text-field-mask lever-mask-direct-cost"></div>
  //               </div>
  //           </div>

  //           <div>
  //             <span>What are your Indirect Costs?</span>
  //               <div className="lever-text-field-container">
  //                 <input 
  //                   className="text-field lever-text-field-indirect-cost" 
  //                   type="number"
  //                   value={indirectCost}
  //                   onChange={(event)=>handleChange(event, setIndirectCost)}
  //                   />
  //                 <label className="text-field-label lever-label-indirect-cost">indirect costs</label>
  //                 <div className="text-field-mask lever-mask-indirect-cost"></div>
  //               </div>
  //           </div>

  //           <div>
  //             <span>What is your Revenue?</span>
  //               <div className="lever-text-field-container">
  //                 <input 
  //                   className="text-field lever-text-field-revenue" 
  //                   type="number" 
  //                   value={revenue}
  //                   onChange={(event)=>handleChange(event, setRevenue)}
  //                 />
  //                 <label className="text-field-label lever-label-revenue">revenue</label>
  //                 <div className="text-field-mask lever-mask-revenue"></div>
  //               </div>
  //           </div>

  //         </form>
  //       <div className="data-result">
  //         <h3 className="data-result-heading">Result</h3>
  //         <p>A 1% improvement in price will deliver {price.toFixed(1)}% improvement in profit.</p> 
  //         {/* <p>This translates to $x more profit in your pocket per year</p> */}
  //         <br />
  //         <p>A 1% increase in sales will deliver {growth.toFixed(1)}% improvement in profit.</p>
  //         {/* <p>This translate into $x more profit in your pocket per year</p> */}
  //         <br />
  //         <p>A 1% reduction in direct cost will deliver {directCostChange.toFixed(1)}% improvement in profit.</p>
  //         {/* <p>This translates into $x more profit in your pocket per year</p> */}
  //         <br />
  //         <p>A 1% reduction in indirect costs will deliver {indirectCostChange.toFixed(1)}% improvement in profit.</p>
  //         {/* <p>This translates into $x more profit in your pocket each year</p> */}
  //       </div>
  //     </div>
  //   </center>
  // );
}

export default ProfitLever;