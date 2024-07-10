# @EVENTS BACKEND

Here you'll find the documentation to understand the backend side of the project.

Firs of all we'll find this folder and files structure: 

- [src](#src)
  - [api](#api)
    - controllers
      - event_controller.js
      - user_controller.js
    - models
      - event_model.js
      - user_model.js
    - routes
      - event_routes.js
      - user_routes.js
  - assets
    - images
      - user-img
  - config
    - db.js
  - middleware
    - auth.js
    - files-users.middleware.js
    - is-admin.js
  - seeds
    - events.seed.js
    - users.seed.js
  - utils
    - delete_img_cloudinary.js
    - jwt.js
- .gitignore
- [index.js](#indexjs)
- package-lock.json
- package.json
- README.md
- [vercel.json](#verceljson)

---

## src

Inside the `src` folder we'll find most of the code for the backend.

### api
First, the `api` folder, which contains all the files that could modify how the database works, such as the models and controllers.

`controllers`:

In this folder we'll find 2 files:
- `event_controller.js`
- `user_controller.js`


## index.js

Inside this file we'll have the initialized configuration for the cloud services we are using for uploading and hosting the images (cloudinary)

```javascript
configCloudinary()
```

Then we'll find the initialized function to begin the connection with the database: 

```javascript
connectDB()
```

After that, the routing for the application: 

```javascript
server.use(express.json())
server.use(cors())

server.use("/users", userRouter)
server.use("/events", eventsRouter)

server.use("*", (req, res, next) => {
  return res.status(404).json(`error 404: route not found`)
})

// this last route is for the route not found page
```

And last, the listen to hear the changes in the local server used for production: 
```javascript
server.listen(3000, ()=> {
   console.log(`server launched at: http://localhost:3000`)
})
```

## vercel.json

In this file we have the configuration for deployment, in this case we are using `vercel`