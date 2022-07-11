

const DEMO_LIST = [
  {
    id: 'user1',
    userId: 'outstar',
    profile: 'https://wonderfulmind.co.kr/wp-content/uploads/2017/03/%EC%86%90%EC%97%90-%EA%B3%A0%EC%96%91%EC%9D%B4-600x409-e1535510249284.jpeg'
  },
  {
    id: 'user2',
    userId: 'inout',
    profile: 'https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/TQL3VWKLRHHBL4GJI4TDIQB3PE.jpg'
  },
  {
    id: 'user3',
    userId: 'moon',
    profile: 'https://www.sciencetimes.co.kr/wp-content/uploads/2017/01/333524.jpg'
  }
];

const FriendList = ({ user }) => {
  return (
    <div>
      <div className='friend my-profile'>
        <img className='profile' src={user.profile} alt='profile' />
        <p className='user-id'><a href='#'>{user.userId}</a></p>
      </div>
      <div>
        <ul className='friend-list'>
        {DEMO_LIST.length > 0 ? DEMO_LIST.map(friend => (
          <li className='friend' key={friend.id}>
            <img className='profile' src={friend.profile} alt='profile' />
            <p className='user-id'><a href='#'>{friend.userId}</a></p>
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