# Vidiprinter
A basic vidiprinter implementation for football events. 

The application reads in a file containing a list of football in-game events. 
These events indicate that something significant occurred within a match; these events will be for many different matches. 
The order of these events will be based on the time of day at which they occurred.

The Vidiprinter will print these events to the console, with a configurable delay between events.

## Example Output

PL Goal Wolves 2 Leeds 4 Rodrigo (90+7)

PL Off Jonny (Wolves) Serious foul play (84)

PL HT Wolves 0 Leeds 1

PL FT Wolves 2 Leeds 4

## How to Build

Install dependencies:

```
pnpm install
```

Build the project:

```
pnpm build
```

## How to Run the Solution

Run the application (after building):

```
pnpm start
```

Or, if you want to run directly with ts-node:

```
pnpm dev
```

## How to Test

Run the tests:

```
pnpm test
```

## Dependencies

- [TypeScript](https://www.typescriptlang.org/)
- [pnpm](https://pnpm.io/) (package manager)
- [Jest](https://jestjs.io/) (testing framework)
- [ts-node](https://typestrong.org/ts-node/) (TypeScript execution environment)
- [eslint](https://eslint.org/) (linter)
