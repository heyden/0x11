# How `0x11` is built

## What it's made with

[discord.js](https://discord.js.org/#/) is used for the Discord capabilities. Please read through the [discord.js guide](https://discordjs.guide/#before-you-begin) to learn more.

[cls-proxify](https://www.npmjs.com/package/cls-proxify) is used for request tracing in logging.


## Project Structure

### `bin`

Run scripts for the application or updating the Discord application settings.

### `docs`

All codebase documentation and diagrams.

### `scripts`

Scripts for local development or continuous integration.\

### `src`

All application source code.

### `src/apis`

Clients for interactions with third party APIs such as GitHub.

### `src/commands`

Discord commands.

### `src/services`

Business logic layer.

### `src/utils`

Utilities for the application.

### `src/app.js`

Main application file.
