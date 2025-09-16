# Franchise API Example (Pokemon & Digimon)

A small NestJS project that:

- Uses Hexagonal architecture with use cases, ports and adapters.
- Calls external APIs (Pokémon API and Digi-API).
- Validates incoming data depending on the selected franchise.
- Logs requests and responses to a local SQLite database.

---

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

---

## Database
This project uses SQLite to store logs.
The file is created automatically at **persistence/logs.sqlite**

## Running the server
```bash
npm run start:dev
```

## Available Endpoint
```bash
GET /api/:franchise/:version
```

### Path parameters
| Name        | Description                    |
| ----------- | ------------------------------ |
| `franchise` | `pokemon` or `digimon`         |
| `version`   | Any version string (e.g. `v1`) |

### Query parameters
| Name       | Type | Description                                                           |
| ---------- | ---- | --------------------------------------------------------------------- |
| `metadata` | JSON | Required. Metadata for the franchise. Structure depends on franchise. |
| `config`   | JSON | Required. External API configuration (must include `baseUrl`).        |

## Logs

Every successful or failed request is:

- Logged to the console with NestJS Logger
- Saved to the SQLite database at persistence/logs.sqlite

