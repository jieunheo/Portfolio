import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref as sRef, deleteObject } from "firebase/storage";
import { useState } from "react";
import { db, getUser, storage } from "../../fbace";


const OutstarItem = ({ star }) => {
  const my = getUser();

  const [text, setText] = useState(star.text);
  const [like, setLike] = useState(false);
  const [isModify, setIsModify] = useState(false);

  const likeHandler = () => {
    setLike(prevLike => !prevLike);
  }

  const modifyHandler  = () => {
    setIsModify(prevMody => !prevMody);
  }

  const modifyOkHandler = async (event) => {
    event.preventDefault();
    console.log(event.target[0].value);

    const userRef = await updateDoc(doc(db, "outstars", star.id), {
     text: event.target[0].value
    });
    setText(event.target[0].value);
    modifyHandler();
  }

  const deleteHandler = async () => {
    await deleteDoc(doc(db, "outstars", star.id));

    if(star.photo.length > 0) {
      const desertRef = sRef(storage, `Images/`+star.fileName);
  
      deleteObject(desertRef)
        .then(() => {
          console.log(`delete success`);
        })
        .catch(error => {
          console.log(`delete ${error}`);
        });
    }
  }

  return (
    <div className='star'>
      <div className='star-head'>
        <img className='profile' src={star.profile} alt={star.userId} />
        <p className='user-id'>{star.userId}</p>  
        <p className='star-date'>{new Date(star.date).toLocaleString()}</p>
      </div>
      {star.photo.length > 0 && <img className='star-photo' src={star.photo} alt={star.text} />}
      {!isModify && <p className='star-text'>{text}</p>}
      {isModify && (
        <form onSubmit={modifyOkHandler}>
          <textarea className='modi-text' defaultValue={star.text}></textarea>
          {isModify && (
            <div className='actions'>
              <button type='button' className={'btn'} onClick={modifyHandler}>취소</button>
              <button type='submit' className={'btn'}>완료</button>
            </div>
          )}
        </form>
      )}
      {!isModify && (
        <div className='actions'>
            <button type='button' className={`btn ${like && 'btn-select'}`} onClick={likeHandler}>{like ? '좋아요 취소' : '좋아요'}</button>
            {my.uid === star.userNum && (
              <>
                <button type='button' className={'btn'} onClick={modifyHandler}>수정</button>
                <button type='button' className={'btn'} onClick={deleteHandler}>삭제</button>
              </>
            )}
        </div>
      )}
    </div>
  )
}

export default OutstarItem;