import React, { Component } from "react";
import "./css/App.css";
import pokeball from "./assets/pokeball.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: undefined,
      error: false,
      errorMsg: "",
      textInput: ""
    };
  }

  // parses moves from API data object
  renderMoves() {
    let moves = [];
    for (let key in this.state.pokemon.moves) {
      moves.push(<li key={key}>{this.state.pokemon.moves[key].move.name}</li>);
    }
    return moves;
  }
  // parses types from API data object
  renderTypes() {
    let types = [];
    for (let key in this.state.pokemon.types) {
      types.push(<li key={key}>{this.state.pokemon.types[key].type.name}</li>);
    }

    return types;
  }

  // parses abilities from API data object
  renderAbilities() {
    let abilities = [];
    for (let key in this.state.pokemon.abilities) {
      abilities.push(
        <li key={key}>{this.state.pokemon.abilities[key].ability.name}</li>
      );
    }

    return abilities;
  }

  // parses sprites from API data object
  renderSprites() {
    let sprites = [];
    // parse through all objects in sprites
    for (let key in this.state.pokemon.sprites) {
      // only take those that contain string (exclude child objects and undefined)
      if (typeof this.state.pokemon.sprites[key] === "string") {
        let desc = `Pokemon (${key})`;
        sprites.push(
          <img
            key={key}
            src={this.state.pokemon.sprites[key]}
            title={desc}
            alt={desc}
            className="poke-image"
          />
        );
      }
    }
    return sprites;
  }

  render() {
    const { pokemon, error, errorMsg, textInput } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <h1>Pokemon Search</h1>
          <h2>Gotta fetch 'em all!</h2>
          <img src={pokeball} alt="Pokeball" />
        </div>
        <div className="poke-fetch">
          <h3>Enter a number to search for a pokemon</h3>
          <div className="input-group">
            <form onSubmit={this.getPokemon}>
              <input
                value={textInput}
                type="number"
                className="input"
                onChange={(ev) =>
                  this.setState({ textInput: ev.target.value, error: false })
                }
              />
              <button className="submit-button" type="submit">
                Search Pokemon
              </button>
            </form>
          </div>
          {error ? (
            <div className="error-container">
              <h3>Error! {errorMsg}</h3>
            </div>
          ) : null}
          {pokemon ? (
            <div className="poke-card">
              <h3>You chose</h3>
              <h2>{pokemon.name}</h2>
              <div className="poke-sprites">{this.renderSprites()}</div>
              <h3>Types</h3>
              <ul className="poke-types">
                <div className="poke-type">{this.renderTypes()}</div>
              </ul>
              <h3>Abilities</h3>
              <ul className="poke-abilities">
                <div className="poke-ability">{this.renderAbilities()}</div>
              </ul>
              <h3>Moves</h3>
              <ul className="poke-moves">
                <div className="poke-moves">{this.renderMoves()}</div>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  getPokemon = (evt) => {
    evt.preventDefault();
    const { textInput } = this.state;
    if (textInput.length) {
      const url = `https://pokeapi.co/api/v2/pokemon/${textInput}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched pokemon " + data.name);
          console.log(data);
          this.setState({ pokemon: data });
        })
        .catch((errorResponse) => {
          //setPokemonName("Your Pokemon is currently on lunch break");
          let errorText = errorResponse.toString();
          //console.log("Error: " + errorText);
          this.setState({
            error: true,
            errorMsg: errorText,
            pokemon: undefined
          });
        });
      //TODO: Add fetch code below
    }
  };
}

export default App;
