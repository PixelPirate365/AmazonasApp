import Spinner from 'react-bootstrap/Spinner'

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status" variant="primary" >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loading