import React from 'react'
import Bookcard from './Bookcard'
const Booklist=(props)=> {
    return (
        <div className="list">
        {
            props.books.map((book,i)=>{
                return <Bookcard
                    key={i}
                    image={book.volumeInfo.imageLinks.thumbnail}
                    title={book.volumeInfo.title}
                    author={book.volumeInfo.authors}
                    published={book.volumeInfo.publishedDate}
                />
            })
        }
        </div>
    )
}

export default Booklist;
 