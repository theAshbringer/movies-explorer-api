# 

## Repo link


## API
There are USER and CARD entities. All available actions are listed below.

### Users:

| Route            | Methods | Description           | Status             |
|------------------|---------|-----------------------|--------------------|
| /users           | GET     | Get all users         | 200, 500           |
|                  | POST    | Create user           | 201, 400, 500      |
| /users/:userId   | GET     | Get user by ID        | 200, 400, 404, 500 |
| /users/me        | PATCH   | Update user's profile | 200, 400, 500      |
| /users/me/avatar | PATCH   | Update user's avatar  | 200, 400, 500      |

### Cards:

| Route                | Methods | Description       | Status             |
|----------------------|---------|-------------------|--------------------|
| /cards               | GET     | Get all cards     | 200, 500           |
|                      | POST    | Add card          | 201, 400, 500      |
| /cards/:cardId       | DELETE  | Delete card by ID | 200, 400, 404, 500 |
| /cards/:cardId/likes | PUT     | Like card         | 200, 400, 404, 500 |
|                      | DELETE  | Dislike card      | 200, 400, 404, 500 |


## Run project

`npm run start` — run server

`npm run dev` — run server with hot-reload
