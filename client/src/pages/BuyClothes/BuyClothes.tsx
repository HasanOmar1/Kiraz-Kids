import { useParams } from "react-router-dom";
import { useThemeContext } from "../../context/ThemeContext";
import { useClothesContext } from "../../context/ClothesContext";
import { useEffect, useState } from "react";
import "./BuyClothes.css";
import upperCaseLetter from "../../utils/UpperCaseLetter";

const BuyClothes = () => {
  const { getClothesById, clothesById } = useClothesContext();
  const { id } = useParams();
  const [currentColor, setCurrentColor] = useState(
    clothesById?.color ?? "green"
  );

  const { getThemeClassName } = useThemeContext();

  useEffect(() => {
    getClothesById(id);
  }, [id]);
  console.log(clothesById);

  const currentActiveColor = (color: string) => {
    setCurrentColor(color);
  };

  return (
    <main className={`Page BuyClothes ${getThemeClassName()}`}>
      {clothesById && (
        <div className="data-container">
          <img
            src={
              currentColor === "blue"
                ? clothesById.blueImg
                : currentColor === "green"
                ? clothesById.greenImg
                : currentColor === "black"
                ? clothesById.blackImg
                : ""
            }
            alt="product img"
          />
          <div className="data">
            <h1>{clothesById.name}</h1>
            <h2>
              Size : <span>{clothesById.size}</span>
            </h2>
            <h2>
              Price : <span>{clothesById.price}$</span>
            </h2>
            <hr />
            <h2>
              Color :{" "}
              <span>
                {upperCaseLetter(
                  currentColor ? currentColor : clothesById.color
                )}
              </span>
            </h2>
            <div className="colors-container">
              <div
                className={`green ${currentColor === "green" && "active"}`}
                onClick={() => currentActiveColor("green")}
              ></div>
              <div
                className={`black ${currentColor === "black" && "active"}`}
                onClick={() => currentActiveColor("black")}
              ></div>
              <div
                className={`blue ${currentColor === "blue" && "active"}`}
                onClick={() => currentActiveColor("blue")}
              ></div>
            </div>
            <p id="type-info">
              {clothesById.type === "pants"
                ? "Fit: True to size—designed with a long, slim leg and ribbed ankle cuffs"
                : clothesById.type === "shirts"
                ? "Fit: True to size—designed for a relaxed fit"
                : clothesById.type === "hoodies"
                ? "Fit: Unisex style. Designed for a boxy, oversized look—size down if you prefer a closer fit."
                : clothesById.type === "shorts"
                ? `Fit: True to size—designed with a shorter inseam than our classic 7" styles`
                : ""}
            </p>
            <div className="buy-btn-container">
              <button id="buy-btn">Add To Bag</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default BuyClothes;
