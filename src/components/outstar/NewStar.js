import SliceSection from '../UI/SliceSection';
import OutstarForm from './OutstarForm';
import OutstarPhotoSelect from './OutstarPhotoSelect';


const NewStar = () => {

  return (
    <div className='newstar-wrap'>
      <form className='newstar-form'>
        <SliceSection left={<OutstarPhotoSelect />} right={<OutstarForm />} />
      </form>
    </div>
  )
}

export default NewStar;