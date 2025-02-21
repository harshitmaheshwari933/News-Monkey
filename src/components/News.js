import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types'


export class News extends Component {
   
   static defaultProps={
    country: "us",
    pageSize: 6
   }
       
    static propTypes={
      country: PropTypes.string,
      pageSize: PropTypes.number
    }


    
    constructor(){
      super();
      this.state= {
        articles: [],   // agr mujhe kabhi upar wala articles use karna hoga to isme me this.articles pass kara duga in future             
        loading: false,
        page:1
        
      }
    }

    async componentDidMount(){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&apiKey=1e8c65f986234eeaa9ee573c40991003&page=1&pageSize=${this.props.pageSize}`
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({articles: parsedData.articles, 
        totalResults: parsedData.totalResults, 
        loading: false})  
    }
     
    handlePreviousClick =async()=>{
     console.log("pre")
     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&apiKey=1e8c65f986234eeaa9ee573c40991003&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
     this.setState({loading: true});
     let data = await fetch(url);
     let parsedData = await data.json()
     this.setState({loading: false});
     this.setState({articles: parsedData.articles}) 
     this.setState({page: this.state.page-1})
    }
    handleNextClick = async()=>{
      console.log("next")
      if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

      }
      else{
          let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&apiKey=1e8c65f986234eeaa9ee573c40991003&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
          this.setState({loading: true});
          let data = await fetch(url);
          let parsedData = await data.json()
          this.setState({loading: false});
          this.setState({articles: parsedData.articles})  
          this.setState({page: this.state.page+1})
      }
    }

  render() {
    return (
     <div className='container my-3'>
      <h2 className='text-center'>NewsMonkey - Top Headlines</h2>
      {this.state.loading && <Spinner/>}
      <div className="row">
      {!this.state.loading && this.state.articles.map((element)=>{
         return <div className="col md-3 d-flex align-items-stretch" key={element.url} >
            <NewsItem title={element.title?element.title.slice(0, 20):""} 
            description={element.description?element.description.slice(0, 20):""} 
            imageUrl={element.urlToImage} 
            newsUrl={element.url}/>
          </div>
         })}
       </div>
       <div className="container d-flex justify-content-around">
        <button disabled={this.state.page<=1} type='button' className='btn btn-dark' onClick={this.handlePreviousClick}> &larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
       </div>
    </div>
    )
  }
}

export default News
