import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";
import AppContext from "../../context";


function Card({
  id,
	title,
  price,
  imageUrl,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) {
	const { isItemAdded } = React.useContext(AppContext)
  const [isFavorite, setIsFavorite] = React.useState(favorited);
	const obj = {id, parentId: id, title, price, imageUrl}

	const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={205}
          viewBox="0 0 150 205"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
          <rect x="2" y="107" rx="10" ry="10" width="150" height="15" />
          <rect x="2" y="135" rx="10" ry="10" width="105" height="15" />
          <rect x="0" y="179" rx="10" ry="10" width="79" height="24" />
          <rect x="107" y="163" rx="10" ry="10" width="41" height="40" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && <div className={styles.favorite} onClick={onClickFavorite}>
            <img
              src={isFavorite ? "img/liked.svg" : "img/unliked.svg"}
              alt="Unliked"
            />
          </div>}
          <img width={133} height={112} src={imageUrl} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && <img
              className={styles.plus}
              onClick={onClickPlus}
              src={isItemAdded(id) ? "img/btn-checked.svg" : "img/btn-plus.svg"}
              // src={`img/btn-${isItemAdded(id) ? "checked" : "plus"}.svg`}
              alt="Plus"
            />}
          </div>
        </>
      )}
    </div>
  );
}
export default Card;
