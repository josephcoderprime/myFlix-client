
import PropTypes from 'prop-types'
import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './movie-card.scss'

export class MovieCard extends React.Component {
  render() {
    const { movie, } = this.props

    return (
      <div className='card-container'>
        <Card className='card-main'>
          <Link to={`/movies/${movie._id}`}>
            <Card.Img
              className='card-img'
              variant='top'
              src={movie.ImagePath}
            />
          </Link>
          <Link to={`/movies/${movie._id}`}>
            <Card.Img
              className='card-img'
              variant='top'
              src={movie.Image}
            />
          </Link>
          <Card.Body>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <p>{movie.Genre.Name}</p>
            </Link>
            <Link className='card-detail' to={`/movies/${movie._id}`}>
              <Card.Title>{movie.Title}</Card.Title>
            </Link>
            <p><b>Directed By</b></p>
            <Card.Text>
              <Link to={`/Directors/${movie.Director.Name}`}>
                &nbsp;{movie.Director.Name}
              </Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    })
  }),
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.date,
  })
}