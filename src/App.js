import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import LoginForm from './components/LoginForm';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const adminUser = {
		email: "admin@admin.com",
		password: "admin123"
	}

	const[user, setUser] = useState({name: "", email: ""});
	const [error, setError] = useState("");

	const Login = details => {
		console.log(details);
		if(details.email == adminUser.email && details.password == adminUser.password){
		console.log("Loggd In");
		setUser({
			name: details.name,
			email:details.email
		});
	}
	else{
		console.log("Credentials do not match");
		setError("Credentials do not match");
	}
}
	
	const Logout = () => {
		setUser({name: "", email: ""});
	}
	
	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-watchflix-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-watchflix-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
		<div className="App">
				{
				(user.email == "") ? (<LoginForm Login={Login} error={error}/>) : (
					<div className = 'container-fluid watchflix'>
					<div className='row align-items-center mt-1 mb-1'>
					<MovieListHeading heading='Movies' />
					<button onClick={Logout}>Logout</button>
					<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
					</div>
					<div className='row'>
							<MovieList
								movies={movies}
								handleFavouritesClick={addFavouriteMovie}
								favouriteComp={AddFavourites} />
						</div><div className='row align-items-center mt-1 mb-1'>
							<MovieListHeading heading='Favourites' />
						</div><div className='row'>
							<MovieList
								movies={favourites}
								handleFavouritesClick={removeFavouriteMovie}
								favouriteComp={RemoveFavourites} />
						</div>
						</div>
			)  
			}
		</div>
	);
};
  
  export default App;