import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar
  ({ category }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-success d-flex justify-content-between ">
        <div className="container">
          <Link className="navbar-brand text-white fs-3 fw-bold fst-italic" to="/" >Nani Di Hatti</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link text-white active fs-5" aria-current="page" to="/">Home</Link>
            <Link className="nav-link text-white" to="/login">Login</Link>
            <Link className="nav-link text-white" to="/signup">Sign up</Link>

          </div>
        </div>
      </nav>
    </>
  )
}
