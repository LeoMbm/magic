# Magic the Gatering

This is a [Next.js](https://nextjs.org/) starter kit that uses [NextAuth.js](https://next-auth.js.org/) for simple email + password login, [Drizzle](https://orm.drizzle.team) as the ORM, and a [Neon Postgres](https://vercel.com/postgres) database to persist the data.

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

- First I choose to use Next.js because I think it's more simple for a "fullstack" application. I used the starter pack given by Vercel (Next - Typescript - Tailwind - NextAuth - Prisma already installed and configured in the project).

- I created a database and one table for users.
