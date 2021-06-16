const Part = (props) => {
    return (
        <>
            {props.part} : <strong>{props.exercises}</strong>
        </>
    )
}

const Header = (props) => {
    return (
    <>
      <h2>{props.course.name}</h2>
    </>)
}
  
const Contents = (props) => {
    return (
    <>
        {props.course.parts.map(part => <li key={part.id}><Part part={part.name} exercises={part.exercises} /></li>)}
    </>)
}
  
const Total = (props) => {
    return (
    <>
      <p>
        Total Number of Exercises : <strong>{props.course.parts.reduce((sum, part) => {
            return sum + part.exercises
        }, 0)}</strong>
      </p>
    </> )
}
  
const Course = ({course}) => {
    return(
    <>
        <Header course={course}/>
        <Contents course={course} />
        <Total course={course}/>
    </>
    )
}

export default Course