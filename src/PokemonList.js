import React, { useState, useEffect } from 'react';
import './PokemonList.css'; // Import the CSS file

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonList();
  }, []);

  const fetchPokemonImage = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.sprites.front_default;
    } catch (error) {
      console.error('Error fetching Pokemon image:', error);
    }
  };

  const fetchSelectedPokemonImages = async () => {
    const selectedPokemonNames = ['bulbasaur', 'ivysaur', 'venusaur', 'butterfree', 'weedle', 'metapod'];

    const selectedPokemonList = pokemonList
      .filter((pokemon) => selectedPokemonNames.includes(pokemon.name))
      .map(async (pokemon) => {
        const imageUrl = await fetchPokemonImage(pokemon.url);
        return { ...pokemon, imageUrl };
      });

    const updatedSelectedPokemonList = await Promise.all(selectedPokemonList);
    setPokemonList(updatedSelectedPokemonList);
  };

  useEffect(() => {
    if (pokemonList.length > 0) {
      fetchSelectedPokemonImages();
    }
  }, [pokemonList]);

  return (
    <div className='pockemon-list'>
      <h1>Hello My name is Aydin👋😉🫠</h1>
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li className='pokemon-li' key={index}>
            <div className='pokemon-img'>
              <img src={pokemon.imageUrl} alt={pokemon.name} />
            </div>
            {pokemon.name}
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
