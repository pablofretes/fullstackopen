const DisplayNumbers = ({ persons, newFilter, handleClick}) => {

    return (
        <>
            <ul>
                {persons.filter(person =>  {
                    if(newFilter === '') {
                        return person
                    } else if (person.name.toLowerCase().includes(newFilter.toLowerCase())) {
                        return person
                    } else {
                        return null
                    }
                }).map(person => <li key={person.id}>{person.name} : {person.number} 
                <button onClick={() => handleClick(person.id)}>Delete</button></li>)}
                
            </ul>
        </>
    )
}

export default DisplayNumbers