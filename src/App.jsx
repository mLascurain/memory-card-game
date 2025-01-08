import "./App.css";
import { useState, useEffect } from "react";
import Card from "./components/Card";
import Header from "./components/Header";

function App() {
  const storedBestScore = localStorage.getItem("bestScoreStoraged");
  const storedBestScoreInt = parseInt(storedBestScore) + 1;
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(storedBestScoreInt || 0);

  const handleClick = (cardId) => {
    if (clickedCards.includes(cardId)) {
      setCurrentScore(0);
      setClickedCards([]);
      alert("Game Over: Sos chotisimo");
    } else {
      const newCurrentScore = currentScore + 1;
      setCurrentScore(newCurrentScore);
      setClickedCards([...clickedCards, cardId]);
      if (bestScore < newCurrentScore) {
        setBestScore(newCurrentScore);
        localStorage.setItem("bestScoreStoraged", bestScore);
      }
    }
  };

  useEffect(() => {
    const numCards = 10;
    const fetchCards = async () => {
      try {
        const randomNumbers = new Set();
        const pokemonsUrl = [];
        while (randomNumbers.size < numCards) {
          const randomNum = Math.floor(Math.random() * 200) + 1;
          if (!randomNumbers.has(randomNum)) {
            randomNumbers.add(randomNum);
            pokemonsUrl.push(`https://pokeapi.co/api/v2/pokemon/${randomNum}`);
          } else {
            console.log("Pokemon REPETIDO!!!: " + randomNum);
          }
        }
        const pokemonsJSON = await Promise.all(
          pokemonsUrl.map((url) => fetch(url).then((res) => res.json()))
        );
        const pokemons = pokemonsJSON.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.front_default,
        }));
        setCards(pokemons);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    fetchCards();
  }, [currentScore]);

  return (
    <div className="container">
      <Header currentScore={currentScore} bestScore={bestScore}></Header>
      <div className="cards">
        {cards.map((card) => (
          <div key={card.id} onClick={() => handleClick(card.id)}>
            <Card img={card.image} name={card.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
