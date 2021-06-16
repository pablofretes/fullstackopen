const Filter = (props) => {
    return (
        <div>
            <input type='text' placeholder='Search...' value={props.newFilter} onChange={props.handleFilter} />
        </div>
    )
}

export default Filter