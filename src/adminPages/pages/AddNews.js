import React from 'react'
import { Container } from 'react-bootstrap'
import JoditEditorComponent2 from '../components/JoditEditor2.js'
// import JoditEditorComponent from '../components/JoditEditor'

const AddNews = () => {
  return (
    <Container className='d-flex flex-column justify-content-center align-content-center flex-wrap'>
        <h1>Add News</h1>
        <JoditEditorComponent2 />
    </Container>
  )
}

export default AddNews