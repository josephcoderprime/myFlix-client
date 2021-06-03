
import Config from '../../config.js';
import axios from 'axios'
import { Navigation } from '../Navigation/navigation';
import PropTypes from 'prop-types'
import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './movie-view.scss'


export class MovieView extends React.Component {
  constructor() {
    super()

    this.state = {
      movies: [],
      FavoriteMovies: []
    }
  }

  addToFavoriteMovies(movie) {
    const username = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    axios
      .post(`${Config.API_URL}/users/${username}/movies/${movie}`,
        {
          FavoriteMovies: this.FavoriteMovies
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        this.setState({
          FavoriteMovies: response.data.FavoriteMovies
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    alert('movie successfully added.')
  }

  render() {
    const { movie } = this.props

    if (!movie) return null

    return (
      <div className='view-container'>
        <Navigation />
        <Container className='movie-view-container'>
          <div className='movie-view'>
            <img className='movie-poster' variant='top' src={movie.ImagePath} />
            <div className='movie-title'>
              <span className='label'><b>Title: </b></span>
              <span className='value'>{movie.Title}</span>
            </div>
            <div className='movie-description'>
              <span className='label'><b>Description: </b></span>
              <span className='value'> {movie.Description}</span>
            </div>

            <div className='movie-genre'>
              <span className='label'> <b>Genre: </b></span>
              <span className='value'>{movie.Genre.Name}</span>
            </div>
            <div className='movie-director'>
              <span className='label'><b>Director: </b></span>
              <span className='value'>{movie.Director.Name}</span>
            </div>
            <Link to={`/Directors/${movie.Director.Name}`}>
              <Button className='button-director'>Director</Button>
            </Link>
            <Link to={`/`}>
              <Button className=' button-goBack'>Back</Button>
            </Link>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button className='button-genre'>{movie.Genre.Name}</Button>
            </Link>
            <Button
              className='button-favorite'
              onClick={() => this.addToFavoriteMovies(movie._id)}
            >
              Add to Favorites
            </Button>
          </div>
        </Container>
      </div>
    )
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.date,
      Death: PropTypes.date
    }),
    ImagePath: PropTypes.string.isRequired
  })
}