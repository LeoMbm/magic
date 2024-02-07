import Link from "next/link";

export default function Page() {
  return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="text-center max-w-screen-sm mb-10">
          <h1 className="text-stone-200 font-bold text-2xl mb-5">
            Hi! Welcome into my technical test.
          </h1>
          <Link
            href="https://en.wikipedia.org/wiki/Magic:_The_Gathering"
            className="text-stone-400  underline hover:text-stone-200 transition-all "
          >
            Magic The Gatering
          </Link>
          <p className="text-stone-400 mt-5">
            This is a simple web app that allows you to search for cards, add
            them to a deck, and get the average mana cost of the cards that
            aren&apos;t land inside the deck.
          </p>
          <p className="text-stone-400 mt-5">
            I didn&apos;t use memory or local storage so if you refresh the page
            you will loose your deck.
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/protected"
            className="text-stone-400 underline hover:text-stone-200 transition-all"
          >
            Build your deck
          </Link>
        </div>
      </div>
    </div>
  );
}
