"use client";
import React, { useState } from "react";
import Deck from "../components/Deck";
import SearchCard from "./SearchCard";

const FullDeck: React.FC = () => {
  const [deck, setDeck] = useState<any[]>([]);

  return (
    <div className="container-fluid w-full">
      <SearchCard setDeck={setDeck} />
      <Deck deck={deck} />
    </div>
  );
};

export default FullDeck;
