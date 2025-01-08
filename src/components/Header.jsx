/* eslint-disable react/prop-types */
export default function Header({ currentScore, bestScore }) {
  return (
    <div className="header">
      <h1>Memory Card Game</h1>
      <div>
        <p>Score: {currentScore}</p>
        <p>Best Score: {bestScore}</p>
      </div>
    </div>
  );
}
