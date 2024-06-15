import React from 'react'
import { ReactTyped } from  'react-typed'

const Home = () => {
  return <>
  <div className="container-fluid main">
    <div className="row">
      <div className="col-md-6 offset-md-3">
          <div className="uppertext text-center pt-5 mt-5">
            <h6 className='pt-3 mb-4 mt-2'>              
              <ReactTyped
                className="typed-text"
                strings={["Welcome to Talkshop", "The best way to find yourself is to lose yourself in the service of others."]}  
                typeSpeed={60}
                backSpeed={60}
                loop
              />
              </h6>
            <p>Your one-stop shop for the best products and services.</p> 
          </div>
          <div className="searchfield text-center mt-4">
            <div className="input-group">
              <input type="text" className="form-control search-input" placeholder="Search for products..." />
              <div className="input-group-append">
                <button className="btn btn-outline-light search-btn" type="button"><i className="fa fa-search"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  </>
}

export default Home