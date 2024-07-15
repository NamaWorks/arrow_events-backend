# @EVENTS BACKEND

Here you'll find the documentation to understand the backend side of the project.

Firs of all we'll find this folder and files structure: 

- [@EVENTS BACKEND](#events-backend)
  - [src](#src)
    - [api](#api)
    - [assets](#assets)
    - [config](#config)
    - [middleware](#middleware)
    - [seeds](#seeds)
    - [utils](#utils)
  - [index.js](#indexjs)
  - [vercel.json](#verceljson)
  - [Developed using:](#developed-using)

---

## src

Inside the `src` folder we'll find most of the code for the backend.

### api
First, the `api` folder, which contains all the files that could modify how the database works, such as the models and controllers.

`controllers`:

In this folder we'll find 2 files with the next functions:
- `event_controller.js`
  - `getEvents`
  - `postEvent`
  - `updateEvent`
  - `removeEvent`
  - `populateEvents`
- `user_controller.js`
  - `getUsers`
  - `getUserById`
  - `userLogin`
  - `userSignUp`
  - `deleteUser`
  - `updateUser`

---

`models`:

Here, the files that will stablish the models for the database collections

  - `event_model.js`: Will include the ***mongoose*** library Schema to prepare the Event model for the Database  
  - `user_model.js`: Will include the ***mongoose*** library Schema to prepare the User model for the Database  

---
    
`routes`: 

This is where the routes for the Database requests will be created.

  - `event_routes.js`
  - `user_routes.js`

Both files inlcude similar routes, using the `Router()` function from the ***express*** library.

In the routes we can find some routes that show a middle element, a middleware:

```javascript
userRouter.post("/new", upload.single('profilePicture'), userSignUp)

// the middleware executes a function before doing the request function. In this case the function is uploaing the profilePicture key of the element given based in the User model before doing the signup
```

### assets

Here there will be the elements/files, such as images, used in the project.

### config

This folder includes the file `db.js`, which contains the database configuration, using ***mongoose*** in this case. here is alse where we read the environment variables.

### middleware

Here are the middleware functions previously mentioned.
  - `auth.js`: Here is the authentication verification function (`isAuth`) which makes use of JWT (json web token) library.
  - `files-users.middleware.js`: This file is for different functions: 
    - `configCloudinary`: Configuration for Cloudinary
    - `storage`: Configuration for the storage in Cloudinary, like folder and allowed formats
    - `upload`: Function to upload files to  Cloudinary
  - `is-admin.js`: Here is the Admin verification function, which checks if the user making the login is an Admin or not. Also making use of JWT library

### seeds

Seed files to add to the database as a batch.

- `users.seed.js`: 
  - `configCloudinary` function utilisation.
  - `usersFeed`: The data from the users to be uploaded as a batch.
  - `userDocuments`: The conversion of the users data to information structured as the User model. Making use of the library ***bcrypt*** for the encription of the password.
  - `feedUsers`: This function has several steps:
    - It performs a try catch for handling errors
    - Inside dethe trycatch it starts cleaning the Cloudinary folder where the user profile pictures are being stored
      ```javascript
      // remove all images before uploading the new seed ones
      cloudinary.api.delete_resources_by_prefix("14_RTC_P10_be-to-fe-js/users", function(result){});
        ```
    - Then, we use the Cloudinary library to upload the pictures and we change the value in the data so it now shows the link for Cloudinary instead of the folder path in the local machine
      ```javascript
      // upload each image of the seed and change the url
      for (let i = 0; i < usersDocuments.length; i++) {
      const user = usersDocuments[i];
       await cloudinary.uploader
       .upload(user.profilePicture, {
        use_filename: true,
        folder: "14_RTC_P10_be-to-fe-js/users",
       })
       .then((result)=> {
        user.profilePicture = result.url
       })
      }
      ```
    - Now, after updating the data with the links to the cloud saved image, the data is fed to the database
      ```javascript
          async function feed(){
      try {
        await mongoose
        .connect(process.env.DB_URL)
        .then(async () => {
          // Clean the collection before uploading the new seed
          const allUsers = await User.find();
          allUsers.length ? await User.collection.drop() : console.log(`user collection already empty`)
        })
        .catch( err => console.log(`error user collection: ${err}`))
        .then(async () => {
          // Add the new users as a batch following the User model
          await User.insertMany(usersDocuments)
          console.log(`usersDocuments uploaded to DB`)
        })
        .catch(err => console.log(`error uploading userDocuments to DB: ${err}`))
      } catch (err) {
        console.log(`error feeding users: ${err}`)
      }
      }
      ```
    - Finally we finish the process with `process.exit()`

---

- `events.seed.js`: 
  - `eventsFeed`: The data from the events to be uploaded as a batch.
  - `feedEvents`: This function has several steps:
      ```javascript
      const feedEvents = async () => {
        let eventsData = [];
        try {
          // Database connection
          await mongoose
            .connect(process.env.DB_URL)
            .then(async () => {
              // clean collection if it has content
              const allEvents = await Event.find();
              allEvents.length
                ? await Event.collection.drop()
                : console.log(`event collection already empty`);
            })
            .catch((err) =>
              console.log(`error at removing event collection : ${err}`)
            )
            .then(async () => {
              // Get the data from the users collection
              const usersData = await User.find();

              // Iterate each event in order to change the attendants names for the _id value in the users collection
              eventsFeed.forEach((eventItem) => {
                const eventAttendants = eventItem.attendants;
                let attendantsIdArr = [];

                eventAttendants.forEach(async (attendant) => {
                  usersData.forEach((userItem) => {
                    if (userItem.username == attendant) {
                      let id = String(userItem._id);
                      attendantsIdArr.push(id);
                    }
                    eventItem.attendants = attendantsIdArr;
                  });
                });
                eventsData.push(new Event(eventItem));
              });
            })
            .then(async () => {
              // Add the events as a batch following the Event model
              await Event.insertMany(eventsData);
              console.log(`events uploaded to DB`);
              process.exit();
            })
            .catch((err) => console.log(`error uploading events to DB: ${err}`));
        } catch (err) {
          console.log(`error uploading events to DB: ${err}`);
          process.exit();
        }
      };
      ```
    - Finally we finish the process with `process.exit()`


### utils

- `delete_img_cloudinary.js`: includes the function to remove images from Cloudinary
- `jwt.js`: includes functions to create and verify tokens

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

And last, the listen method to hear the changes in the local server used for production: 
```javascript
server.listen(3000, ()=> {
   console.log(`server launched at: http://localhost:3000`)
})
```


## vercel.json

In this file we have the configuration for deployment, in this case we are using `vercel`

## Developed using:
<div >
	<img width="80" src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png" alt="HTML" title="HTML"/>
	<img width="80" src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" alt="CSS" title="CSS"/>
	<img width="80" src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="JavaScript" title="JavaScript"/>
	<img width="80" src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png" alt="mongoDB" title="mongoDB"/>
	<img width="80" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express"/>
	<img width="80" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/>
	<img width="80" src="https://github-production-user-asset-6210df.s3.amazonaws.com/62091613/261395532-b40892ef-efb8-4b0e-a6b5-d1cfc2f3fc35.png" alt="Vite" title="Vite"/>
	<img width="80" src="https://user-images.githubusercontent.com/25181517/189715289-df3ee512-6eca-463f-a0f4-c10d94a06b2f.png" alt="Figma" title="Figma"/>
</div>