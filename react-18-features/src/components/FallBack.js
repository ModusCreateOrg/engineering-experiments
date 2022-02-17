const FallBack = () => {
  console.log('fallback')
  return (
    <>
      <h3>FallBack</h3>
      Loading...
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only" />
      </div>
    </>
  )
}

export default FallBack
