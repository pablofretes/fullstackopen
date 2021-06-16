const Filter = ({ filter, handleFilter }) => {
    return (
        <div>
            <label htmlFor='search'>Find countries</label>
            <input name='search' type='text' placeholder='Search...' value={filter} onChange={handleFilter}/>
        </div>
    )
}

export default Filter