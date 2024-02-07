"use client";
import Image from "next/image";
import React from "react";
interface DeckProps {
  deck: Card[];
}

const Deck: React.FC<DeckProps> = ({ deck }) => {
  const calculateAverageManaCost = () => {
    const nonLandCards = deck.filter((card) => !card.type.includes("Land"));
    const totalManaCost = nonLandCards.reduce(
      (i, card) => i + parseInt(card.cmc),
      0
    );
    return nonLandCards.length > 0 ? totalManaCost / nonLandCards.length : 0;
  };

  const imageLoader = ({ src }: any) => {
    src = src.replace("http", "https");
    return src;
  };

  return (
    <div className="text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">Your Deck ({deck.length})</h1>
      <p className="text-stone-400 mb-4 text-lg underline">
        Average Mana Cost: {calculateAverageManaCost()}
      </p>
      <div className="grid grid-cols-3 gap-4 max-h-full">
        {deck.map((card) => (
          <div
            key={card.id}
            className="bg-gray-800 rounded-md mb-4 p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold mb-2">{card.name}</h2>
              <p className="text-gray-400 mb-2">{card.type}</p>
              <p className="text-gray-400">Mana Cost: {card.manaCost}</p>
            </div>
            <div>
              <Image
                loader={imageLoader}
                src={card.imageUrl}
                height={48}
                width={48}
                alt={card.name}
                className="h-fit w-full object-cover rounded-md"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deck;
