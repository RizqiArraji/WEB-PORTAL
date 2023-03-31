import { Link } from "react-router-dom"

export default function GuestNav(){
    return(
        <>
        <nav className="navbar navbar-expand-md navbar-dark bg-primary" aria-label="Fourth navbar example">
    <div className="container">
      <a className="navbar-brand" href="#">WEB-PORTAL</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false"  aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExample04">
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to={'/'}>Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to={'/about'}>About</Link>
          </li>
        </ul>
      <div className="navbar-nav ms-auto">
        <Link className="dropdown-item text-white bg-primary" to={'/login'}>Login</Link>
    </div>
      </div>
    </div>
  </nav>
        </>
    )
}
