# Magic the Gatering

## Context

[Magic the Gathering](https://en.wikipedia.org/wiki/Magic:TheGathering) has been a card game for about 20 years. The principle is quite simple behind. You have a set of cards that produce mana inside your deck and the other cards of the deck need some mana to be played. The cards that produce mana are called land. The others are spells, rituals, creatures, artifacts, or enchantments.

## Rules

- A deck is a collection of at least 20 cards and a maximum of 30. (60 in the game, but it's easier with a smaller number ;)
- Land don't have a mana cost
- We should display the average mana cost of the deck even if the number of cards has not reached 20.
- We can't have more than 30 cards in a deck.

## Requirement

We would like you to create a new application that allows you to search for cards, add them to a deck, and get the average mana cost of the cards that aren't land inside the deck.

The goal is that you showcase your mastery. Please provide some Readme with an explanation of what you did.

## What i did ?

First I choose to use Next.js because I think it's more simple for a "fullstack" application. I used the starter pack given by Vercel (Next - Typescript - Tailwind - NextAuth - Prisma already installed and configured in the project).
I created a database and one table for users.

> I started with the api it's the simplest thing to do when i start a new project. In the folder [app/api/cards](./app//api/cards/route.ts) you can find the complete code

```javascript
const name = new URL(req.url || "").searchParams.get("name") || "";
const res = await fetch(
  `https://api.magicthegathering.io/v1/cards?name=${name}`,
  {
    method: "GET",
  }
);
const card = await res.json();
console.log(card);
return new Response(JSON.stringify(card.cards), {
  status: 200,
});
```

> I retrieve the name of the card from the form below [(see full code here)](./components/SearchCard.tsx)

```typescript
const SearchCard: React.FC<SearchCardProps> = ({ setDeck }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Card[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  const searchCards = async (searchTerm: string) => {
    try {
      setSearchResults([]);
      setLoading(true);
      const res = await fetch(`/api/cards?name=${searchTerm}`);
      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching cards:", error);
    } finally {
      setLoading(false);
    }
  };
```

At first i did a form where the user need to submit to get the results, but i think for a better user experience here we need to do something like results immediately in a search box

- Here we request to the api each time the input value changes

```typescript

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


...

```

- Then you can add the card to the deck

```typescript
{
  searchResults.map((card) => (
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
  ));
}
```

- We need to have some check because we don't want to have duplicate card in the deck, the length of the deck must be 30 and i applied a rule i saw on google about the maximun of copies =D

```typescript
const addToDeck = (card: Card) => {
  if (deck.length >= 30) {
    console.error("Deck limit reached. Cannot add more cards.");
    setToastVisible(true);
    return;
  }

  if (deck.filter((c) => c.id === card.id).length >= 4) {
    console.error("Maximum number of copies reached for this card.");
    return;
  }

  if (deck.some((c) => c.name === card.name && c.type === card.type)) {
    console.error("A card with the same name and type is already in the deck.");
    return;
  }

  setLocalDeck([...deck, card]);
  setDeck([...deck, card]);
};
```

> When you add a card to the deck i implement the average mana cost. [full code here](./components/Deck.tsx)

- If the type of the card is "Land" mana cost will be 0 else we can calculate and i fixed the cost to be Float with 2 digits.

```typescript
const Deck: React.FC<DeckProps> = ({ deck }) => {
  const calculateAverageManaCost = () => {
    const nonLandCards = deck.filter((card) => !card.type.includes("Land"));
    const totalManaCost = nonLandCards.reduce(
      (i, card) => i + parseInt(card.cmc),
      0
    );
    const averageManaCost =
      nonLandCards.length > 0 ? totalManaCost / nonLandCards.length : 0;
    return parseFloat(averageManaCost.toFixed(2));
  };
```
