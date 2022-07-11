import { useState } from "react";



const OutstarPhotoSelect = () => {
  const [photo, setPhoto] = useState('');

  const selectPhoto = (event) => {
    const {target :{files}} = event;

    setPhoto(URL.createObjectURL(files[0]));
  }

  return (
    <div className='newstar-photo-wrap'>
      {photo.trim().length > 0 && <img className='newstar-photo' src={photo} alt={photo} />}
      <input className='newstar-file' id='new-photo' type='file' accept='img/*' onChange={selectPhoto} />
      <label className='btn photo-btn' htmlFor='new-photo'>사진 선택하기</label>
    </div>
  )
}

export default OutstarPhotoSelect;