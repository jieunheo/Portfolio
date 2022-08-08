import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { getUser, logout } from "../../fbace";

const Header = ({ userId, setUserId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const my = getUser();
    
    if(my) {
      navigate('/');
    }
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
          <li><Link to='/new-star' >New Star</Link></li>
          {/* <li><Link to='/chat' >chat</Link></li> */}
          <li><Link to='/likes' >Likes</Link></li>
          <li><Link to='/profile' >Profile</Link></li>
          <li><button onClick={logoutHandler}>logout</button></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;