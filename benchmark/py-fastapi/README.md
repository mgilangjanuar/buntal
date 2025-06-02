# py-fastapi

A minimal FastAPI project with a `/json` endpoint returning `{ "message": "Hello, World!" }`.

## Setup

1. Install dependencies:
   ```sh
   pip install fastapi uvicorn
   ```
2. Run the server:
   ```sh
   uvicorn main:app --reload
   ```

## Endpoint

- `GET /json` → `{ "message": "Hello, World!" }`
