import { getUser } from "../../fbace";


const DEMO_LIST = [
  {
    uid: 'user1',
    email: 'outstar@example.com',
    photoURL: 'https://wonderfulmind.co.kr/wp-content/uploads/2017/03/%EC%86%90%EC%97%90-%EA%B3%A0%EC%96%91%EC%9D%B4-600x409-e1535510249284.jpeg'
  },
  {
    uid: 'user2',
    email: 'inout@example.com',
    photoURL: 'https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/TQL3VWKLRHHBL4GJI4TDIQB3PE.jpg'
  },
  {
    uid: 'user3',
    email: 'moon@example.com',
    photoURL: 'https://www.sciencetimes.co.kr/wp-content/uploads/2017/01/333524.jpg'
  }
];

const FriendList = () => {
  const my = getUser();

  return (
    <div>
      <div className='friend my-profile'>
        <img className='profile' src={my.photoURL ? my.photoURL : 'https://www.sciencetimes.co.kr/wp-content/uploads/2017/01/333524.jpg'} alt='profile' />
        <p className='user-id'><a href='#'>{my.email}</a></p>
      </div>
      <div>
        <ul className='friend-list'>
        {DEMO_LIST.length > 0 ? DEMO_LIST.map(friend => (
          <li className='friend' key={friend.uid}>
            <img className='profile' src={friend.photoURL} alt='profile' />
            <p className='user-id'><a href='#'>{friend.email}</a></p>
            <button className='btn'>채팅하기</button>
          </li>
        )) : (
          <li>친구가 없습니다.</li>
        )}
        </ul>
      </div>
    </div>
  )
}

export default FriendList;