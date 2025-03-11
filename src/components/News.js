import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types'


export class News extends Component {
   
   static defaultProps={
    country: "us",
    pageSize: 6,
    category: "general",
   }
       
    static propTypes={
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string,
    }

    capitalizeFirstLetter = (string)=>{
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    

    constructor(props){
      super(props);
      this.state= {
        articles: [],   // agr mujhe kabhi sampleOutput.json se articles use karna hoga to isme me this.articles pass kara duga in future             
        loading: false,
        page:1
        
      }
      document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async updateNews(){
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({articles: parsedData.articles, 
        totalResults: parsedData.totalResults, 
        loading: false})  
    }

    async componentDidMount(){
      this.updateNews(); 
    }
     
    handlePreviousClick =async()=>{
    this.setState({page: this.state.page -1});
    this.updateNews();
    }


    handleNextClick = async()=>{
      this.setState({page: this.state.page + 1});
      this.updateNews();
    }

  render() {
    return (
     <div className='container my-3'>
      <h2 className='text-center' style={{margin: '30px 0px', marginTop: '90px' }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h2>
      {this.state.loading && <Spinner/>}
      <div className="row">
      {!this.state.loading && this.state.articles.map((element)=>{
         return <div className="col md-3 d-flex align-items-stretch" key={element.url} >
            <NewsItem title={element.title?element.title.slice(0, 20):""} 
            description={element.description?element.description.slice(0, 20):""} 
            imageUrl={element.urlToImage} 
            newsUrl={element.url}
            author={element.author} 
            date={element.publishedAt}/>
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
