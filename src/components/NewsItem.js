import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
  
   let {title , description, imageUrl, newsUrl, author, date} = this.props;
    return (
      <div className='my-3'>
                
               <div className="card h-100" style={{width: "18rem", textAlign: "center"}}>
                    <img src={!imageUrl?"https://st.depositphotos.com/2934765/53192/v/450/depositphotos_531920820-stock-illustration-photo-available-vector-icon-default.jpg":imageUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark" rel="noreferrer">Read More</a>
                    </div>
                    </div>
                   
      </div>
    )
  }
}

export default NewsItem
