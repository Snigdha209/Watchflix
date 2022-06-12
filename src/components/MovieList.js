import React from 'react';

const MovieList = (props) =>{
    const FavouriteComp = props.favouriteComp;
    return (
        <>
          {props.movies.map((movie, index) =>( 
          <div className='image-container justitfy-content-start m-1'>
              <img src ={movie.Poster} alt='movie'></img>
              <div onClick={()=> props.handleFavouritesClick(movie)} className='overlay d-flex align-items-center justify-content-center'>
                  <FavouriteComp />
              </div>
          </div>
          ))}
        </>
    );
};

export default MovieList;