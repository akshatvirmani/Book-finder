import React from "react";
import { Component } from "react";
import Search from "./Search";
import request from "superagent";
import Booklist from "./Booklist";

class Books extends Component{
    constructor(props){
        super(props);
        this.state={
            books:[],
            searchfield:"",
            sort:""
        }
    }

    searchbook=(e)=>{
        e.preventDefault();
        request
           .get("https://www.googleapis.com/books/v1/volumes")
           .query({q:this.state.searchfield})
           .then((data)=>{
                const cleanData=this.cleanData(data)
                this.setState({books:cleanData})
           })
    }
 
    handleSearch=(e)=>{   
        this.setState({searchfield:e.target.value})
      }
      handleSort=(e)=>{
        this.setState({sort:e.target.value})
      }

      cleanData=(data)=>{
        const cleanedData=data.body.items.map((book)=>{
          if(book.volumeInfo.hasOwnProperty("publishedDate")===false){
            book.volumeInfo["publishedDate"]="0000";
          }
          else if(book.volumeInfo.hasOwnProperty("imageLinks")===false){
            book.volumeInfo["imageLinks"]={thumbnail:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0ZffYejRFQCBPqG9MVABSJqGvZ957elHa3fp_OFVW88xWM2HrZ4jd2c8ILcdQu8ELQdU&usqp=CAU"}
          }
          return book;
        })
        return cleanedData; 
      }

  render(){
    const sortedBooks =this.state.books.sort((a,b)=>{
      if(this.state.sort==="Newest"){
        return parseInt(b.volumeInfo.publishedDate.substring(0,4))-parseInt(a.volumeInfo.publishedDate.substring(0,4))
      }
      else if(this.state.sort==="Oldest"){
        return parseInt(a.volumeInfo.publishedDate.substring(0,4))-parseInt(b.volumeInfo.publishedDate.substring(0,4))
      }
    })
    return (
      <div>
        <Search searchbook={this.searchbook} handleSearch={this.handleSearch} handleSort={this.handleSort}/>
        <Booklist books={sortedBooks}/>
      </div>
    );
  }
}

export default Books;