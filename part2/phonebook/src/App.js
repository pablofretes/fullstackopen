import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import DisplayNumbers from './components/DisplayNumbers'
import Filter from './components/Filter'
import Persons from './services/Persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [notificationMessage, setNotification] = useState({message: null, class: null})

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const helperFindExisting = (existing) => {
    return persons.filter(person => person.name.toLowerCase() === existing.name.toLowerCase())
  }

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    let contactAlreadyExists = helperFindExisting(personObject)
    if(contactAlreadyExists.length !== 0){
      const oldConctact = contactAlreadyExists[0]
      const replaceName = window.confirm(`${newName} is already added to the phonebook, would you like to replace the number?`)
      
      if(replaceName){
        const changedNumber = { ...oldConctact, number: newNumber}
        Persons
          .changeNumbers(oldConctact.id, changedNumber)
          .then(response => {
            setPersons(persons.map(person => person.id !== oldConctact.id ? person : response.data))
            setNewName('')
            setNewNumber('')
            setNotification(          
              { message : `Your contact '${oldConctact.name}' has been succesfully updated!`, class : 'success'}        
              )        
              setTimeout(() => {          
                setNotification(null)        
              }, 5000)
          })
          .catch(error => {
            setNotification(          
              { message : `Your contact '${oldConctact.name}' couldn't be updated`, class: 'error'}      
              )        
              setTimeout(() => {          
                setNotification(null)        
              }, 5000)
          })
      } else {
        Persons
        .postPersons(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setNotification(          
            { message : `Your contact '${oldConctact.name}' couldn't be added` , class: 'error'}  
            )        
            setTimeout(() => {          
              setNotification(null)        
            }, 5000)
        })
      }
    }
    Persons
    .postPersons(personObject)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
      setNotification(         
        { message : `Your contact '${personObject.name}' has been succesfully added!` , class: 'success'}       
        )        
        setTimeout(() => {          
          setNotification(null)        
        }, 5000)
    })
    .catch(error => {
      setNotification(          
        { message : `Your contact '${personObject.name}' couldn't be added` , class: 'error'}    
        )        
        setTimeout(() => {          
          setNotification(null)        
        }, 5000)
    })
  }

  const personsAPI = () => {
    Persons
      .getPersons()
      .then(response => {
        setPersons(response.data)
      })
      .catch(error => {
        alert('There was a problem leading the data')
      })
  }

  useEffect(personsAPI, [])

  const addPersonInfo = {
    newName,
    newNumber,
    handleNewName,
    handleNewNumber,
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)

    const deleteConfirmation = window.confirm(`Delete ${personToDelete.name}?`)

    if(deleteConfirmation){
      Persons
      .deletePersons(id)
      .then(response => {
        console.log(response.data)
        setPersons(persons.map(person => person.id !== id ? person : response.data))
        setNotification(          
          { message : `Your contact has been succesfully deleted` , class: 'error'}         
          )        
          setTimeout(() => {          
            setNotification(null)        
          }, 5000)
      })
      .catch(error => {
        setNotification(          
          { message : `Your contact was already removed from the server` , class: 'error'}         
          )        
          setTimeout(() => {          
            setNotification(null)        
          }, 5000)
      })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} />
      <Filter newFilter={newFilter} handleFilter={handleFilter}/>
      <br></br>
      <h2>Add A New Contact!</h2>
      <Form addName={addName} info={addPersonInfo}/>
      <h2>Numbers</h2>
      <DisplayNumbers persons={persons} newFilter={newFilter} handleClick={deletePerson}/>
    </div>
  )
}

export default App