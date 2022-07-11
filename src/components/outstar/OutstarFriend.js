import FriendList from "../friend/FriendList";
import SliceSection from "../UI/SliceSection";
import OutstarList from "./OutstarList";

const DEMO_USER = {
  userId: 'outmoon',
  profile: 'https://t1.daumcdn.net/cfile/tistory/1116E83A4FA7A13C24'
}

const OutstarFriend = () => {
  return (
    <div className='friend-wrap'>
      <SliceSection left={<OutstarList />} right={<FriendList user={DEMO_USER} />} />
    </div>
  )
}

export default OutstarFriend;