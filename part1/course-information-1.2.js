import React from 'react'

const Header = (props) => {
  return (
  <div>
    <h1>{props.course}</h1>
  </div>)
}

const Contents = (props) => {
  return (
  <div>
    <p>
      Part: {props.part}, exercises: {props.exercises} 
    </p>
  </div>)
}

const Total = (props) => {
  return (
  <div>
    <p>
      Total Number of Exercises : {props.exerciseTotal}
    </p>
  </div> )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (    
    <div>
      <Header course = {course}/>
      <Contents part = {part1} exercises = {exercises1}/>
      <Contents part = {part2} exercises = {exercises2}/>
      <Contents part = {part3} exercises = {exercises3}/>
      <Total exerciseTotal = {exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App