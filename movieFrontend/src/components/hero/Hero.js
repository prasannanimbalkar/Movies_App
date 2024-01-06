import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';

import { Grid, Card, CardMedia, CardContent, CardActions } from '@mui/material';

const Hero = ({movies}) => {

    const navigate = useNavigate();

    function reviews(movieId)
    {
        navigate(`/Reviews/${movieId}`);
    }

    return (
      <>
        <div className ='movie-carousel-container'>
        <Carousel>
            {
                movies?.map((movie) =>{
                return(
                    <Paper key={movie.imdbId}>
                        <div className = 'movie-card-container'>
                            <div className="movie-card" style={{"--img": `url(${movie.backdrops[0]})`}}>
                                <div className="movie-detail">
                                    <div className="movie-poster">
                                        <img src={movie.poster} alt="" />
                                    </div>
                                    <div className="movie-title">
                                        <h4>{movie.title}</h4>
                                    </div>
                                    <div className="movie-buttons-container">
                                        <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                            <div className="play-button-icon-container">
                                                <FontAwesomeIcon className="play-button-icon"
                                                    icon = {faCirclePlay}
                                                />
                                            </div>
                                        </Link>

                                        <div className="movie-review-button-container">
                                            <Button variant ="info" onClick={() => reviews(movie.imdbId)} >Reviews</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Paper>
                )
            })
        }
        </Carousel>
        </div>
        <div>
        <div className='movie-cards-container'>
                <Grid container spacing={4}>
                    {movies?.map((movie) => (
                        <Grid item xs={12} sm={6} md={3} key={movie.imdbId}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    width="50%"
                                    image={movie.poster}
                                    alt={movie.title}
                                />
                                <CardContent>
                                    <h4>{movie.title}</h4>
                                </CardContent>
                                <CardActions>
                                    <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                        <FontAwesomeIcon icon={faCirclePlay} />
                                    </Link>
                                    <Button variant="info" onClick={() => reviews(movie.imdbId)}>Reviews</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
      </>
  )
}

export default Hero
