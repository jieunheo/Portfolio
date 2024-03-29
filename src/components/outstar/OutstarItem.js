import { addDoc, collection, deleteDoc, deleteField, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { ref as sRef, deleteObject } from "firebase/storage";
import { useEffect, useState } from "react";
import { db, getUser, storage } from "../../fbace";


const OutstarItem = ({ star }) => {
  const my = getUser();

  const [text, setText] = useState(star.text);
  const [like, setLike] = useState(false);
  const [isModify, setIsModify] = useState(false);

  useEffect(() => {
    getLikes(star.id);
  }, [])

  const getLikes = async (starId) => {
    const likesQuery = query(collection(db, "likes"), orderBy("date", "desc"), where('userId', '==', my.uid), where('outstarId', '==', starId));
    const querySnapshotLike = await getDocs(likesQuery);
    console.log(querySnapshotLike);
    querySnapshotLike.forEach(async (like) => {
      like && setLike(true);
    });
  }

  const likeHandler = async () => {
    if(like) { // like 취소
      let likesId = '';

      const likesQuery = query(collection(db, "likes"), orderBy("date", "desc"), where('userId', '==', my.uid), where('outstarId', '==', star.id));
      const querySnapshotLike = await getDocs(likesQuery);
      console.log(querySnapshotLike);
      querySnapshotLike.forEach(async (like) => {
        likesId = like.id;
        console.log(likesId);
        await deleteDoc(doc(db, 'likes', likesId));
      });
    } else { // like에 추가
      const docRef = await addDoc(collection(db, "likes"), {
        userId: my.uid,
        outstarId: star.id,
        date: Date.now()
      });
    }

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
        <p className='user-id'>{(my.uid === star.userNum && my.displayName) ? my.displayName : star.userId}</p>  
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