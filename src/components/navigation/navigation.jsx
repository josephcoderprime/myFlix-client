import axios from 'axios'
import React from 'react'
import { NavDropdown, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './navigation.scss'

export class Navigation extends React.Component {
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
      .get(`https://flixofficial.herokuapp.com/users/${username}`, {
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
      <Navbar
        collapseOnSelect
        expand='lg'
        variant='dark'
        sticky='top'
      >
        <Navbar.Brand className='nav-brand' as={Link} to={`/`}>
          myFlix Movies
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <NavDropdown title='Account' id='basic-nav-dropdown'>
              <NavDropdown.Item as={Link} to={`/users/{user}`}>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                className='log-out'
                onClick={() => this.onLoggedOut()}
              >
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}