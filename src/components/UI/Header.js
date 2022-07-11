import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header>
      <h1><Link to='/' >Outstar</Link></h1>
      <nav>
        <ul className='nav'>
          <li><Link to='/' >Home</Link></li>
          <li><Link to='/new-star' >new star</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;