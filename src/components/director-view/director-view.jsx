
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export class DirectorView extends React.Component {
  render() {
    const { director, movies, onBackClick } = this.props;
    return (
      <div className="director-view">
        <div className="director-name">
          <span className="label"><b>Name: </b></span>
          <span className="value">{director.Name}</span>
        </div>
        <div className="director-bio">
          <span className="label"><b>Bio: </b> </span>
          <span className="value">{director.Bio}</span>
        </div>
        <div className="director-birth">
          <span className="label"><b>Birth:</b>  </span>
          <span className="value">{director.Birth}</span>
        </div>
        <div className="director-death">
          <span className="label"><b>Death:</b> </span>
          <span className="value">{director.Death}</span>
        </div>
        <div className="director-movies">
          <span className="label"><b>Movies directed by</b> {director.Name} </span>
          <div>
            {movies.map((m) => {
              if (m.Director.Name === director.Name) {
                return (
                  <div key={m._id}>
                    <Card>
                      <Card.Img variant="top" className='director-pic' src={director.Image} />
                      <Card.Body>
                        <Card.Title>{m.Title}</Card.Title>
                        <Link to={`/movies/${m._id}`}>
                          <Button variant="outline-primary">About the Movie</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <Button variant="secondary" onClick={() => { onBackClick(null) }}>Back</Button>
      </div>
    );
  }
}