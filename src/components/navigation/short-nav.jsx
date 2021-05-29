import React from 'react'
import axios from 'axios'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './navigation.scss'

export class ShortNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Username: null
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token')
    console.log(accessToken)
    if (accessToken !== null) {
      this.getUser(accessToken)
    }
  }

  getUser(token) {
    let username = localStorage.getItem('user')
    axios
      .get(`https://flixofficial.herokuapp.com/users`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  onLoggedIn(authData) {
    this.props.setUser(authData.user.Username)
    localStorage.setItem('token', authData.token)
    localStorage.setItem('user', authData.user.Username)
    this.getMovies(authData.token)
  }

  onLoggedOut(user) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.open('/client', '_self')
  }
  render() {
    const { Username } = this.state

    return (
      <Navbar expand='lg'>
        <Navbar.Brand className='short-nav' as={Link} to='/'>
          Return to Login Page
          </Navbar.Brand>
      </Navbar>
    )
  }
}