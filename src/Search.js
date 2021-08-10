import React from 'react'

const Search=(props)=> {
    return (
       <div className="search">
          <form onSubmit={props.searchbook} action="">
             <input onChange={props.handleSearch} type="text"/>
             <button type="submit" className="submit">Search</button>
             <select className="sort" defaultValue="Sort" onChange={props.handleSort}>
               <option disabled value="Sort">Sort</option>
               <option value="Newest">Newest</option>
               <option value="Oldest">Oldest</option>
             </select>
          </form>
       </div>
    )
}

export default Search;
