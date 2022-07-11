import { useState } from "react";


const OutstarItem = ({ star }) => {
  const [like, setLike] = useState(false);

  const likeHandler = () => {
    setLike(prevLike => !prevLike);
  }

  return (
    <div className='star'>
      <div className='star-head'>
        <img className='profile' src={star.profile} alt={star.userId} />
        <p className='user-id'>{star.userId}</p>  
        <p className='star-date'>{star.date}</p>
      </div>
      {star.photo.length > 0 && <img className='star-photo' src={star.photo} alt={star.text} />}
      <p className='star-text'>{star.text}</p>
      <button className={`btn ${like && 'btn-select'}`} onClick={likeHandler}>{like ? '좋아요 취소' : '좋아요'}</button>
    </div>
  )
}

export default OutstarItem;