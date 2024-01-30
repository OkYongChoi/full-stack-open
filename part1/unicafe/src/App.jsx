import { useState } from "react";

const Button = ({handleClick, text}) => (
 <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({text, score}) => (
  <tr>
    <td> {text} </td>
    <td> {score} </td>
  </tr> 
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const avg = ((good - bad) / all).toFixed(1)
  const pos = ((good/all) * 100).toFixed(1)+'%'
  if (all === 0) {
    return (
      <p>
        No feedback given 
      </p>
    )
  }
  return (
    <>
      <table>
        <tbody>
          <StatisticLine text="good" score={good}/>
          <StatisticLine text="neutral" score={neutral}/>
          <StatisticLine text="bad" score={bad}/>
          <StatisticLine text="all" score={all}/>
          <StatisticLine text="average" score={avg}/>
          <StatisticLine text="positive" score={pos}/>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = () => setGood(good + 1)
  const setToNeutral = () => setNeutral(neutral + 1)
  const setToBad = () => setBad(bad + 1)


  return(
    <>
      <h1>give feedback</h1>
      <Button handleClick={()=>setToGood()} text="good"/>
      <Button handleClick={()=>setToNeutral()} text="neutral"/>
      <Button handleClick={()=>setToBad()} text="bad"/>

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App