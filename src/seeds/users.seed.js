const mongoose =  require("mongoose")
const User = require("../api/models/user_model.js")
const bcrypt = require("bcrypt")
const cloudinary = require("cloudinary").v2

const { configCloudinary } = require("../middleware/files-users.middleware.js")

configCloudinary()

const usersFeed = [
  {
    username: "Anananastasia",
    email: "anastasia@mail.com",
    password: "Anastasia123!@",
    profilePicture: 'src/assets/images/user-img/aanastasia.jpg',
    role:"user",
    // attendingEvents:[]
  },
  {
    username: "Admin",
    email: "admin@admin.com",
    password: "Admin123!@",
    profilePicture: 'src/assets/images/user-img/admin.jpg',
    role:"admin",
    // attendingEvents:[]
  },
  {
    username: "hotPotato",
    email: "alex@mail.com",
    password: "Alex123!@",
    profilePicture: 'src/assets/images/user-img/alex.jpg',
    role:"user",
    // attendingEvents:[]
  },
  {
    username: "interntGoblin",
    email: "bea@mail.com",
    password: "Bea123!@",
    profilePicture: 'src/assets/images/user-img/bea.jpg',
    role:"user",
    // attendingEvents:[]
  },
  {
    username: "saltySaltyLemon",
    email: "clara@mail.com",
    password: "Clara123!@",
    profilePicture: 'src/assets/images/user-img/clara.jpg',
    role:"user",
    // attendingEvents:[]
  },
  {
    username: "dolahbillsOnme",
    email: "ismael@mail.com",
    password: "Ismael123!@",
    profilePicture: 'src/assets/images/user-img/ismael.jpg',
    role:"user",
    // attendingEvents:[]
  },
  {
    username: "cocoMangoCrispyPollo",
    email: "juan@mail.com",
    password: "Juan123!@",
    profilePicture: 'src/assets/images/user-img/juanjpg.jpg',
    role:"user",
    // attendingEvents:[]
  },
  {
    username: "theFrog",
    email: "pepe@mail.com",
    password: "Pepe123!@",
    profilePicture: 'src/assets/images/user-img/pepe.jpg',
    role:"user",
    // attendingEvents:[]
  },
  {
    username: "violetsAreBlue",
    email: "rosa@mail.com",
    password: "Rosa123!@",
    profilePicture: 'src/assets/images/user-img/rosa.jpg',
    role:"user",
    // attendingEvents:[]
  },
  {
    username: "softySofi",
    email: "sofia@mail.com",
    password: "Sofia123!@",
    profilePicture: 'src/assets/images/user-img/sofia.jpg',
    role:"user",
    // attendingEvents:[]
  },



]

let usersDocuments = usersFeed.map(user => new User({
  username: user.username,
  email: user.email,
  password: bcrypt.hashSync(user.password, 10),
  profilePicture: user.profilePicture,
  role: user.role,
}))

const feedUsers = async () => {
  try {
    // remove all images before uploading the new seed ones
    cloudinary.api.delete_resources_by_prefix("14_RTC_P10_be-to-fe-js/users", function(result){});
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
    // feed the modified seed
    async function feed(){
      try {
        await mongoose
        .connect(process.env.DB_URL)
        .then(async () => {
          const allUsers = await User.find();
          allUsers.length ? await User.collection.drop() : console.log(`user collection already empty`)
        })
        .catch( err => console.log(`error user collection: ${err}`))
        .then(async () => {
          await User.insertMany(usersDocuments)
          console.log(`usersDocuments uploaded to DB`)
        })
        .catch(err => console.log(`error uploading userDocuments to DB: ${err}`))
      } catch (err) {
        console.log(`error feeding users: ${err}`)
      }
    }
    await feed()
    process.exit()
  } catch (err) {
    console.log(err)
    console.log(`error uploading user profile pictures: ${err}`)
    process.exit()
  }
}

feedUsers()