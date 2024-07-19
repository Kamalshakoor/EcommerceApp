import React from 'react'

const Contact = () => {
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-4 border-end">
            <div className='mt-5 pt-5'>
            <h3 className='mb-4'>Contact Information</h3>
            <p>
              <strong>Address:</strong> 123, Main Street, Anytown, USA 12345
            </p>
            <p>
              <strong>Phone:</strong> +1 (123) 456-7890
            </p>
            <p>
              <strong>Email:</strong> info@example.com
            </p>
            </div>
          </div>
          <div className="col-md-7 shadow p-4 ms-auto">
            <h3 className='mb-4 text-center'>Send us a message</h3>
            <form>
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" placeholder="Enter your name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Enter your email" />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea className="form-control" rows="3" placeholder="Enter your message"></textarea>
              </div>
              <button type="submit" className="btn btn-outline-success mt-3 form-control">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact