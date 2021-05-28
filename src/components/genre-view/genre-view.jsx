
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';



export class GenreView extends React.Component {
  render() {
    const { genre, movies, onBackClick } = this.props;
    return (
      <div className="genre-view">
        <div className="genre-description">
          <span className="label"><b>Description: </b></span>
          <span className="value">{genre.Description}</span>
        </div>
        <div className="director-views">
          <span className="label"><b>Genre</b> {genre.Name}: </span>
          <div>
            {movies.map((m) => {
              if (m.Genre.Name === genre.Name) {
                return (
                  <div key={m._id}>
                    <Card>
                      <Card.Img variant="top" src={m.ImagePath} />
                      <Card.Body>
                        <Card.Title>{m.Title}</Card.Title>
                        <Link to={`/movies/${m._id}`}>
                          <Button variant="outline-primary">Open</Button>
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