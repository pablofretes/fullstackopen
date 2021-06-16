import React, { useState } from 'react'
import ReactDOM from 'react-dom'

/*function randomAnecdote(){
  let randomNumber = Math.ceil(Math.random() * (anecdotes.length - 1))
  return anecdotes[randomNumber]
}*/

function getRandomDifferent(arr, last = undefined) {
  if (arr.length === 0) {
    return;
  } else if (arr.length === 1) {
    return arr[0];
  } else {
    let num = 0;
    do {
      num = Math.floor(Math.random() * arr.length);
    } while (arr[num] === last);
    return arr[num];
  }
}

const Header = () => <h1>Anecdote of the Day</h1>

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button> 
  )
}

const Display = (props) => {
  if(props.allClicks.length === 0){
    return (
      <>
        <p>
          {props.someAnecdote}
          <br></br>
          Has {props.somePoint} Votes.
        </p>
      </>
    )
  }
  return (
    <>
      <p>
        {props.anecdote}
        <br></br>
        Has {props.points} Votes.
      </p>
    </>
  )
}

const DisplayMostVotes = (props) => {
  if(props.allClicks.length === 0){
    return null
  }
  return (
    <>
      <p>
        Most Voted Anecdote
        <br></br>
        {props.mostVoted}
        <br></br>
        With {props.points} Votes!
      </p>
    </>
  )
}


const App = () => {
  const storeArray = new Array(anecdotes.length).fill(0)
  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState([...storeArray])
  const [allClicks, setClicks] = useState([])
  const voteIndex = anecdotes.indexOf(selected)
  function indexxx(what) {
    return anecdotes.indexOf(what)
  }

  const setAnecdotes = () => {
    let random = getRandomDifferent(anecdotes)
    setSelected(random)
    setClicks(allClicks.concat(selected))
    console.log(selected)
  } 

  const storeVotes = () => {
    const voteArray = [...voted]
    voteArray[voteIndex] += 1
    setVoted(voteArray)
    setClicks(allClicks.concat(voted))
    console.log(voted)
  }

  const mostVotedAnecdote = () => {
    let mostVotes = 0 
    let largestIndex = 0
    voted.forEach((anecdote, i) => {
      if(anecdote > mostVotes){
        mostVotes = anecdote
        largestIndex = i
      }
    })
    return largestIndex
  }

  let woohoo = getRandomDifferent(anecdotes)

  return (
    <>
      <Header />
      <Display allClicks={allClicks} someAnecdote={woohoo} somePoint={voted[indexxx(woohoo)]} anecdote={selected} points={voted[voteIndex]}/>
      <br></br>
      <Button handleClick={storeVotes} text="vote" />
      <Button handleClick={setAnecdotes} text='Next Anecdote'/>
      <DisplayMostVotes allClicks={allClicks} mostVoted={anecdotes[mostVotedAnecdote()]} points={voted[mostVotedAnecdote()]} />
    </>
  )
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

export default App;
