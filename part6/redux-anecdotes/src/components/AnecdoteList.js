import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notificationSuccess } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    
    const anecdotesToShow = () => {
        if(props.filter !== ''){
            return props.anecdotes.filter(anecdote => {
                if(anecdote.content.toLowerCase().includes(props.filter.toLowerCase())){
                    return anecdote.content
                } else {
                    return null
                }
            })
        } else {
            return props.anecdotes
        }
    }

    const addVote = (anecdote) => {
        props.vote(anecdote)
        props.notificationSuccess(`You voted for ${anecdote.content}`, 10)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotesToShow().sort((a, b) => (b.votes - a.votes)) && anecdotesToShow().map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => addVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      anecdotes: state.anecdotes,
      filter: state.filter,
    }
}

const mapDispatchToProps = {
    vote,
    notificationSuccess,
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdotes 