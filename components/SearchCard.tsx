"use client";
import React, { useState } from "react";
import ToastMagic from "./ToastMagic";

interface SearchCardProps {
  setDeck: React.Dispatch<React.SetStateAction<Card[]>>;
}

enum ToastState {
  Success = "success",
  Error = "error",
  Warning = "warn",
}

const SearchCard: React.FC<SearchCardProps> = ({ setDeck }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Card[]>([]);
  const [deck, setLocalDeck] = useState<Card[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastState, setToastState] = useState<ToastState>(ToastState.Success);

  const searchCards = async (searchTerm: string) => {
    try {
      setSearchResults([]);
      setLoading(true);
      const res = await fetch(`/api/cards?name=${searchTerm}`);
      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching cards:", error);
      setToastMessage("Error while searching cards");
      setToastState(ToastState.Warning);
      setToastVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const addToDeck = (card: Card) => {
    if (deck.length >= 30) {
      console.error("Deck limit reached. Cannot add more cards.");
      setToastMessage("Deck limit reached. Cannot add more cards.");
      setToastState(ToastState.Warning);
      setToastVisible(true);
      return;
    }

    if (deck.some((c) => c.id === card.id)) {
      console.error("Card is already in the deck.");
      setToastMessage("Card is already in the deck.");
      setToastState(ToastState.Warning);
      setToastVisible(true);
      return;
    }

    setLocalDeck([...deck, card]);
    setDeck([...deck, card]);
  };

  const closeToast = () => {
    setToastVisible(false);
  };

  return (
    <div className="text-white flex flex-col items-center justify-center mb-10">
      <h1 className="text-3xl font-bold mb-8">
        Magic: The Gathering Deck Builder
      </h1>
      {toastVisible && (
        <ToastMagic
          state={toastState}
          message={toastMessage}
          onClose={closeToast}
        />
      )}
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            searchCards(e.target.value);
          }}
          className="px-4 py-2 rounded-md text-black focus:outline-none"
          placeholder="Search for a card..."
        />
      </div>
      <div className="max-h-96 overflow-y-auto w-full max-w-md">
        <ul>
          {loading ? (
            <li className="bg-gray-800 rounded-md mb-4 p-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Searching...</h2>
              </div>
            </li>
          ) : null}
          {searchResults.map((card) => (
            <li
              key={card.id}
              className="bg-gray-800 rounded-md mb-4 p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-bold">{card.name}</h2>
                <p className="text-gray-400">{card.type}</p>
              </div>
              <button
                onClick={() => addToDeck(card)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
              >
                Add to Deck
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchCard;
