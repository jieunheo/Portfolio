import { getAuth, updatePassword, updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../fbace";

import OutstarItem from '../outstar/OutstarItem';
import SliceSection from '../UI/SliceSection';

const Profile = ({ userId }) => {
  const [outstars, setOutstars] = useState([]);
  const [photo, setPhoto] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [newPhoto, setNewPhoto] = useState('');
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [newName, setNewName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  const [password, setPassword] = useState('');
  const [passwordOk, setPasswordOk] = useState('');
  
  const auth = getAuth();
  const user = auth.currentUser;
  useEffect(() => {
    if (user !== null) {
      const email = user.email;
      const displayName = user.displayName;
      const URL = user.photoURL;
  
      setEmail(email);
      setName(displayName ? displayName : email.split('@')[0]);
      setNewName(name);
      setPhotoURL(URL ? URL : 'https://www.sciencetimes.co.kr/wp-content/uploads/2017/01/333524.jpg');

    }
    readOutstars();
  }, [user, photoURL, name]);

  const readOutstars = async() => {
    const stars = [];
    const q = query(collection(db, "outstars"), orderBy("date", "desc"), where("userNum", "==", user.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const star = {
        id: doc.id,
        userId: doc.data().userId,
        userNum: doc.data().userNum,
        profile: doc.data().profile,
        fileName: doc.data().fileName,
        text: doc.data().text,
        photo: doc.data().photo,
        date: doc.data().date
      }
      stars.push(star);
    });
    setOutstars(stars);
  }

  // const handleFileOnChange = event => {
  //   event.preventDefault();
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     setPhoto(file);
  //     setNewPhoto(file);
  //     setFileUrl(URL.createObjectURL(file));
  //   };
  //   if (file) reader.readAsDataURL(file);

  //   console.log(photo);
  // };

  const updateProfileHandler = (event) => {
    event.preventDefault();

    if(name === email.split('@')[0]) {
      return;
    }

    updateProfile(user, {
      displayName: newName,
      // photoURL: newPhoto,
    }).then(() => {
      // Profile updated!
      console.log(`update!!`);
      setName(newName);
    }).catch((error) => {
      // An error occurred
      console.log(`error`);
    });

    // if(password.langth > 0 && password === passwordOk) {
    //   updatePassword(user, password).then(() => {
    //     // Update successful.
    //   }).catch((error) => {
    //     // An error ocurred
    //   });
    // }
  }

  const nameChange = (event) => {
    event.preventDefault();

    setNewName(event.target.value);
  }

  return (
    <div className="my-profile">
      <SliceSection left={
        <form onSubmit={updateProfileHandler}>
          <p className="profile-name">{name === email.split('@')[0] ? email.split('@')[0] : name}'s Profile</p>
          <div className="profile-image">
            <img src={photoURL} alt='profile' />
          </div>
          {/* <div>
            {photo !== '' ? <img className='newstar-photo' src={fileUrl} alt={photo} /> : <img src={photoURL} alt='profile' />}
            <input className='newstar-file' id='new-photo' type='file' accept='img/*' onChange={handleFileOnChange} />
            <label className='btn photo-btn' htmlFor='new-photo'>사진 선택하기</label>
          </div> */}
          <p className="profile-email"><label>email: </label>{email}</p>
          <p className="profile-newName">
            <label htmlFor="name">name: </label>
            <input id="name" value={newName} type="text" onChange={nameChange} />
          </p>
          {/* <p>
            <label htmlFor="password">password: </label>
            <input id="password" type='password' />
          </p>
          <p>
            <label htmlFor="passwordOk">password ok: </label>
            <input id="passwordOk" type='password' />
          </p> */}
          <div className="profile-actions">
            <button className="btn profile-button" type="submit">프로필 수정하기</button>
          </div>
        </form>
      } right={
        <>
          <p className="mystar-title">my stars</p>
          <div className='star-list'>
            {outstars
              ? outstars.map(star => (
                <OutstarItem key={star.id} star={star} />
              )) : (
                <p>없어요</p>
              )}
          </div>
        </>
      } />
    </div>
  );
}

export default Profile;