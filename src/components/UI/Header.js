import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../../fbace";

const Header = ({ userId, setUserId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if(userId !== null) navigate('/');
  }, [userId]);

  const logoutHandler = async () => {
    logout();
    setUserId(null);
    alert('로그아웃 되었습니다');
  }

  return (
    <header>
      <h1><Link to='/' >Outstar</Link></h1>
      <nav>
        <ul className='nav'>
          <li><Link to='/' >Home</Link></li>
          <li><Link to='/new-star' >new star</Link></li>
          <li><button onClick={logoutHandler}>logout</button></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;