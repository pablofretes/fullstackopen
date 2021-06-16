const Button = (props) => <button>{props.text}</button>

const Input = (props) => {
    return (
        <input placeholder={props.placeholder} value={props.value} onChange={props.onChange}/>
    )
}

const Form = (props) => {
    return (
        <form onSubmit={props.addName}>
            <Input placeholder="Name Here..." value={props.info.newName} onChange={props.info.handleNewName} />
            <br></br>
            <Input placeholder="Number Here..." value={props.info.newNumber} onChange={props.info.handleNewNumber}/>
            <br></br>
            <Button text="Add" />
        </form>
    )
}

export default Form