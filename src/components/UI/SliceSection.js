

const SliceSection = ({ left, right }) => {
  return (
    <>
      <section className='left'>
        {left}
      </section>
      <section className='right'>
        {right}
      </section>
    </>
  )
}

export default SliceSection;