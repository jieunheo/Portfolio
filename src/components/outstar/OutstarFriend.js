import FriendList from "../friend/FriendList";
import SliceSection from "../UI/SliceSection";
import OutstarList from "./OutstarList";

const OutstarFriend = () => {
  
  return (
    <div className='friend-wrap'>
      <SliceSection left={<OutstarList />} right={<FriendList />} />
    </div>
  )
}

export default OutstarFriend;