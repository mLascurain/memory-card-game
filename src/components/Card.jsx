/* eslint-disable react/prop-types */
import "./Card.css";
export default function Card({ img, name }) {
  return (
    <div className="card">
      <img src={img} alt={name} />
      <p>{name}</p>
    </div>
  );
}
