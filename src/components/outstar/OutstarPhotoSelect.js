

const OutstarPhotoSelect = ({ photo, handleFileOnChange }) => {

  const selectPhoto = (event) => {
    handleFileOnChange(event);
  }

  return (
    <div className='newstar-photo-wrap'>
      {photo !== '' && <img className='newstar-photo' src={photo} alt={photo} />}
      <input className='newstar-file' id='new-photo' type='file' accept='img/*' onChange={selectPhoto} />
      <label className='btn photo-btn' htmlFor='new-photo'>사진 선택하기</label>
    </div>
  )
}

export default OutstarPhotoSelect;