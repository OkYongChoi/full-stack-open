import { useState } from "react";

const Button = ({handleClick, text}) => (
 <button onClick={handleClick}>{text}</button>
)

const StatLine = ({measure, score}) => {
  return <p> {measure} {score} </p>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = () => setGood(good + 1)
  const setToNeutral = () => setNeutral(neutral + 1)
  const setToBad = () => setBad(bad + 1)
  
  const all = good + neutral + bad
  const avg = (good - bad) / all
  const pos = String((good/all) * 100)+'%'

  return(
    <>
      <h1>give feedback</h1>
      <Button handleClick={()=>setToGood()} text="good"/>
      <Button handleClick={()=>setToNeutral()} text="neutral"/>
      <Button handleClick={()=>setToBad()} text="bad"/>

      <h1>statistics</h1>
      <StatLine measure="good" score={good}/>
      <StatLine measure="neutral" score={neutral}/>
      <StatLine measure="bad" score={bad}/>
      <StatLine measure="all" score={all}/>
      <StatLine measure="average" score={avg}/>
      <StatLine measure="positive" score={pos}/>      
    </>
  )
}

export default App