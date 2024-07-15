import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({isAuthenticated, handleLogout}) => {

  const navigate = useNavigate();
  return <>
    <nav className="navbar navbar-expand-lg nav-bar bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand" to={"/"}>TalkShop</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to={"/home"}> <i className='fa fa-home'></i> Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/shop"}> <i className='fa fa-shopping-bag'></i> Shop</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/about"}> <i className='fa fa-info-circle'></i> About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/contact"}> <i className='fa fa-phone'></i> Contact</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/cart"}  aria-disabled="true"><i className='fa fa-shopping-cart'></i> Cart</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className='fa fa-user-circle mt-1' style={{fontSize:"20px"}}></i>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            {isAuthenticated ?
                                <>
                                    <li><Link className="dropdown-item" to={"/profile"}> <i className='fa fa-user'></i> My Profile</Link></li>
                                    <li><Link className="dropdown-item" to={"/orders"}> <i className='fa fa-shopping-bag'></i> My Orders</Link></li>


                                    <li><hr className="dropdown-divider" /></li>
                                    <li className="nav-item">
                                      <button className="nav-link btn btn-link" onClick={() => handleLogout(navigate)}> <i className='fa fa-sign-out-alt ms-2'></i> Logout</button>
                                    </li>
                                </>
                                :
                                <>
                                    <li><Link className="dropdown-item" to={"/signup"}>Signup</Link></li>
                                    <li><Link className="dropdown-item" to={"/login"}>Login</Link></li>
                                </>
                            }
                        </ul>
                    </li>
                   
                </ul>
            </div>
        </div>
    </nav>
  </>
}

export default Navbar
