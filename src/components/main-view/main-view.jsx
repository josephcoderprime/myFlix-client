import React from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            UsersDetails: [],
            selectedMovie: null,
            user: null,
            register: null
        };
    }

    // verify user is logged in in local storage
    componentDidMount() {
        // Define 'accessToken' as a way to getItem('token') from localStorage
        let accessToken = localStorage.getItem('token');
        // If token has a value
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
            this.getUsersDetails(accessToken);
        }
    }

    // .getMovie() takes in token
    getMovies(token) {

        // Fetch data from the Server side
        axios
            .get(
                'https://flixofficial.herokuapp.com/movies',
                {
                    // Specify the headers, set Authorization: Bearer Token
                    headers: { Authorization: `Bearer ${token}` }
                })

            // Then, 
            .then(
                // take in 'response' data
                (response) => {

                    // Assign API response to the prop setMovies()
                    this.props.setMovies(response.data);
                }
            )

            // Catch errors
            .catch(
                (err) => {
                    // Log errors in the console
                    console.log(err);
                }
            );
    }

    getUserInfo(token) {

        axios.get(
            `https://flixofficial.herokuapp.com/users`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(
                (response) => {
                    this.setState({
                        userInfo: response.data
                    })
                }
            )
            .catch(
                (err) => {
                    console.log(err);
                }
            )
    }

    // Function: log in, takes in 'authData'
    onLoggedIn(authData) {
        this.setState({
            user: authData.user.Username,
        });
        // setItem 'token' and 'user' in the localStorage
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        // Send 'authData.token' to .getMovies()
        this.getMovies(authData.token);
        this.getUsers(authData.token);
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    // When user logs out
    onLoggedOut() {

        this.setState({
            user: null
        });

        // Remove token & user from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        window.open(
            '/',
            '_self'
        );
    }

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }


    onRegister(register) {
        this.setState({
            register
        });
    }

    toggleRegister = (e) => {
        e.preventDefault();
        this.setState({
            register: !this.state.register
        })
    }

    onBackClick() {
        this.setState({
            selectedMovie: null
        });
    }



    render() {
        const { movies, selectedMovie, user, register } = this.state;
        if (register) return <RegistrationView onRegister={register => this.onRegister(register)} toggleRegister={this.toggleRegister} />;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} toggleRegister={this.toggleRegister} />;

        if (movies.length === 0) return <div className='main-view' />;

        return (
            <div className='main-view'>
                {selectedMovie
                    ? (
                        <Row className='justify-content-md-center'>
                            <Col md={8}>
                                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                            </Col>
                        </Row>
                    )
                    : (
                        <Row className='justify-content-md-center'>
                            {movies.map((movie, index) => (
                                <Col md={3} key={index}>
                                    <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />
                                </Col>
                            ))}
                        </Row>
                    )
                }
            </div>
        );
    }
}

MainView.propTypes = {
    movies: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }),
    selectedMovie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    })
}