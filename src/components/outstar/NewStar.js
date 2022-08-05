import { collection, addDoc } from "firebase/firestore";
import { ref as sRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, getUser, storage } from '../../fbace';

import SliceSection from '../UI/SliceSection';
import OutstarForm from './OutstarForm';
import OutstarPhotoSelect from './OutstarPhotoSelect';


const NewStar = () => {
  const [progressing, setProgressing] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [url, setUrl] = useState('');
  const [photo, setPhoto] = useState('');
  const navigate = useNavigate();
  const my = getUser();

  const addOutstar = async (event) => {
    event.preventDefault();
    console.log(photo);
    try {
      if(photo !== '') {
        await saveToFirebaseStorage(photo, event.target[1].value);
      } else {
        addText(event.target[1].value);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setUrl('');
  }

  const addText = async (text, data, fileName) => {
    console.log('url => ', url);
    const docRef = await addDoc(collection(db, "outstars"), {
      userNum: my.uid,
      userId: my.displayName ? my.displayName : my.email.split('@')[0],
      profile: my.photoURL ? my.photoURL : 'https://www.sciencetimes.co.kr/wp-content/uploads/2017/01/333524.jpg',
      text: text,
      photo: data ? data : '',
      fileName: fileName ? fileName : '',
      date: Date.now()
    });
    console.log("Document written with ID: ", docRef.id);
    setProgressing(false);
    navigate('/');
  }
  
  const handleFileOnChange = event => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(file);
      setFileUrl(URL.createObjectURL(file));
    };
    if (file) reader.readAsDataURL(file);
  };
  
  // upload 함수입니다.
  const saveToFirebaseStorage = async (file, text) => {
    setProgressing(true);
    const uniqueKey = new Date().getTime();
    const newName = file.name
      .replace(/[~`!#$%^&*+=\-[\]\\';,/{}()|\\":<>?]/g, "")
      .split(" ")
      .join("");

    const metaData = {
      contentType: file.type
    };

    const storageRef = sRef(storage, "Images/" + newName + uniqueKey);

    const UploadTask = uploadBytesResumable(storageRef, file, metaData);
    return UploadTask.on(
      "state_changed",
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      error => {
        alert(`error: image upload error ${JSON.stringify(error)}`);
      },
      () => {
        getDownloadURL(UploadTask.snapshot.ref).then(downloadUrl => {
          console.log(`완료 url: ${downloadUrl}`);
          addText(text, downloadUrl, newName + uniqueKey);
        });
      }
    );
  };

  return (
    <div className='newstar-wrap'>
      <form className='newstar-form' onSubmit={addOutstar}>
        {!progressing && <SliceSection left={<OutstarPhotoSelect handleFileOnChange={handleFileOnChange} photo={fileUrl} />} right={<OutstarForm addOutstar={addOutstar.bind(this)} />} />}
        {progressing && <p>글을 올리는 중입니다.</p>}
      </form>
    </div>
  )
}

export default NewStar;