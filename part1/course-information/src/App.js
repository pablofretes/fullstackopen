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
      {props.part} contains <strong>{props.exercises}</strong> exercises. 
    </p>
  </div>)
}

const Total = (props) => {
  return (
  <div>
    <p>
      Total Number of Exercises : <strong>{props.exerciseTotal}</strong>.
    </p>
  </div> )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (    
    <div>
      <Header course = {course.name}/>
      <Contents part = {course.parts[0].name} exercises = {course.parts[0].exercises}/>
      <Contents part = {course.parts[1].name} exercises = {course.parts[1].exercises}/>
      <Contents part = {course.parts[2].name} exercises = {course.parts[2].exercises}/>
      <Total exerciseTotal = {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>
    </div>
  )
}

export default App