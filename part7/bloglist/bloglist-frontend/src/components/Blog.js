import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import '../App.css'

const Blog = ({ blog }) => {


  const blogStyle = {
    textAlign: 'center',
    verticalAlign: 'middle',
    borderRadius: 25,
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom: 10,
    border: 'inset',
    borderWidth: 1,
    marginBottom: 5,
    width: 475,
    backgroundColor: '#3f51b5',
  }

  return (
    <Container style={blogStyle} maxWidth="sm" >
      <Link to={`/blogs/${blog.id}`}><p>{blog.title} By <strong>{blog.author}</strong></p></Link>
    </Container>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog