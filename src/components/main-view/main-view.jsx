import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { setMovies } from '../../actions/actions'
import { Link } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view'
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileUpdate } from '../profile-update/profile-update';
import MoviesList from '../movies-list/movies-list';
import Config from '../../config';

import './main-view.scss';


export class MainView extends React.Component {
    constructor() {
        super();
        //Initial state is set to null
        this.state = {
            movies: [],
            user: null,
            token: null,
        };
    }


    // One of the hooks available in a React Component
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    getMovies(token) {
        axios.get(`${Config.API_URL}/movies`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    /* When a user successfully logs in, this function updates the `user` for
    entry in state to the *particular user*/

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        localStorage.setItem('email', authData.user.Email);
        localStorage.setItem('birthday', authData.user.Birthday);
        localStorage.setItem('favoriteMovies', authData.user.FavoriteMovies)
        this.getMovies(authData.token);
    }

    logOut() {
        localStorage.clear();
        this.setState({
            user: null,
        });
        console.log("logout successful");
        alert("You have logout successfully")
    }


    render() {
        //const { movies, register, selectedMovie, user } = this.state;  

        let { movies } = this.props;
        let { user } = this.state;

        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user
        details are *passed as a prop to the LoginView*/

        //before the movie have been loaded
        //if (!us
        return (
            <div>
                <Router>
                    <div className="insert-navbar">
                        <Link to={`/`}>
                            <Button
                                variant="link"
                                className="navbar-link"
                                onClick={() => this.logOut()}
                            >
                                Sign Out
                    </Button>
                        </Link>
                        <Link to={`/users/${user}`}>
                            <Button variant="link" className="navbar-link">
                                My Profile
                    </Button>
                        </Link>

                    </div>
                    <Row className="main-view justify-content-md-center">

                        <Route exact path='/' render={() => {
                            console.log('user= ', user);
                            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                            return <MoviesList movies={movies} />;
                        }} />

                        <Route path="/register" render={() => {
                            if (user) return <Redirect to="/" />
                            return <Col md={6}>
                                <RegistrationView />
                            </Col>
                        }} />

                        <Route path="/movies/:movieId" render={({ match, history }) => {
                            if (!user) return <Col md={6}>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>

                            if (movies.length === 0) return <div className="main-view" />

                            return <Col md={8}>
                                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />

                        <Route path="/directors/:name" render={({ match, history }) => {
                            if (!user) return <Col md={6}>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>

                            if (movies.length === 0) return <div className="main-view" />;

                            return <Col md={8}>
                                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} movies={movies} onBackClick={() => history.goBack()} />
                            </Col>

                        }} />

                        <Route path="/genres/:name" render={({ match, history }) => {
                            if (!user) return <Col md={6}>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>

                            if (movies.length === 0) return <div className="main-view" />;

                            return <Col md={8}>
                                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} movies={movies} />
                            </Col>
                        }} />

                        <Route path="/users/:userId" render={({ history }) => {
                            if (!user) return <Col md={6}>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>

                            if (movies.length === 0) return <div className="main-view" />;

                            return <Col md={8}>
                                <ProfileView movies={movies} onBackClick={() => history.goBack()} />
                            </Col>

                        }} />

                        <Route path="/update/:userId" render={({ history }) => {
                            if (!user) return <Col md={6}>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>

                            if (movies.length === 0) return <div className="main-view" />;

                            return <Col md={8}>
                                <ProfileUpdate movies={movies} onBackClick={() => history.goBack()} /></Col>

                        }} />

                    </Row>
                </Router>
            </div>
        );
    }
}
let mapStateToProps = state => {
    return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView)

