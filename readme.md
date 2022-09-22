
## Running the apps

### Run the server 

- cd identityserver
- dotnet run

### Run the API
- cd api
- dotnet run

### Run the client 
- cd react
- npm start

### Test the flow

- open the react app (https://127.0.0.1:5173)
- Click `login `
- use the following credentials
    - username: alice
    - password: alice
- Click `getweather` to access the api data

## What files that are important to the configuration

### IdentityServer
- `Config.cs`
- `Startup.cs`

### API
- `Program.cs`

### Client (React)
- `Main.tsx`
- `App.tsx`