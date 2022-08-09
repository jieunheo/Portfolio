

const SliceSection = ({ left, right }) => {
  return (
    <div className="slice">
      <section className='left'>
        {left}
      </section>
      <section className='right'>
        {right}
      </section>
    </div>
  )
}

export default SliceSection;