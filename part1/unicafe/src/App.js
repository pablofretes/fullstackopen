import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Header = () => <h1>Give Feedback</h1>

const SubTitle = () => <h2>Statistics</h2>

const Statistics = (props) => {
  if(props.allClicks.length === 0){
    return null
  }
  return (
    <>
      <tr><td>{props.text}:</td><td>{props.value}</td></tr>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const setToNeutral = () => {
    setAll(allClicks.concat(neutral + 1))
    setNeutral(neutral + 1)
  }

  const setToGood = () => {
    setAll(allClicks.concat(good + 1))
    setGood(good + 1)
  }

  const setToBad = () => {
    setAll(allClicks.concat(bad + 1))
    setBad(bad + 1)
  }

  return (
    <>
      <Header />
      <Button handleClick={setToGood} text="Good"/>
      <Button handleClick={setToNeutral} text="Neutral"/>
      <Button handleClick={setToBad} text="Bad"/>
      <SubTitle />
      <table>
        <tbody>
          <Statistics allClicks={allClicks} text="Good" value={good}/>
          <Statistics allClicks={allClicks} text="Neutral" value={neutral}/>
          <Statistics allClicks={allClicks} text="Bad" value={bad}/>
          <Statistics allClicks={allClicks} text="Total" value={good + bad + neutral}/>
          <Statistics allClicks={allClicks} text="Average" value={(good - bad ) / (good + bad + neutral)}/>
          <Statistics allClicks={allClicks} text="Positives" value={(good / (good + bad + neutral)) * 100}/>
        </tbody>
      </table>
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

export default App;
