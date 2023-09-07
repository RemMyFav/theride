import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

function Rating({ rating }) {
  const rates = [0, 0, 0, 0, 0];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      rates[i - 1] = 1;
    } else if (i - rating === 0.5) {
      rates[i - 1] = 0.5;
    }
  }

  return (
    <div className="flex text-xs mt-1 text-prime shadow">
      {rates.map((state, key) => {
        if (state === 1) {
          return <BsStarFill key={key}/>;
        } else if (state === 0.5) {
          return <BsStarHalf key={key}/>;
        } else {
          return <BsStar key={key} />;
        }
      })}
    </div>
  );
}

export default Rating;
