const mongoose = require("mongoose");
const Event = require("../api/models/event_model");
const User = require("../api/models/user_model");

require("dotenv").config();

const eventsFeed = [
  {
    title: "Tech Innovators Summit",
    description:
      "Join us to meet and learn from the pioneers leading the tech industry. A great opportunity to network and gain insights into the latest trends and advancements.",
    date: "2024-06-01",
    location: "Madrid, Spain",
    capacity: "50",
    color: "red",
    attendants: [
      "cocoMangoCrispyPollo",
      "hotPotato",
      "interntGoblin",
      "saltySaltyLemon",
      "dolahbillsOnme",
      "theFrog",
      "violetsAreBlue",
      "softySofi",
    ],
  },
  {
    title: "AI and Machine Learning Conference",
    description:
      "Explore the world of artificial intelligence and machine learning with experts in the field. Discover how these technologies are shaping the future.",
    date: "2024-06-15",
    location: "Barcelona, Spain",
    capacity: "30",
    color: "yellow",
    attendants: [
      "Anananastasia",
      "cocoMangoCrispyPollo",
      "interntGoblin",
      "saltySaltyLemon",
      "theFrog",
      "violetsAreBlue",
      "softySofi",
    ],
  },
  {
    title: "Cybersecurity Year-End Review",
    description:
      "Join cybersecurity professionals to discuss the major threats of the year and how to prepare for the future. Stay one step ahead with our cybersecurity event.",
    date: "2024-12-31",
    location: "Seville, Spain",
    capacity: "100",
    color: "orange",
    attendants: [
      "Anananastasia",
      "cocoMangoCrispyPollo",
      "hotPotato",
      "interntGoblin",
      "saltySaltyLemon",
      "dolahbillsOnme",
    ],
  },
  {
    title: "Blockchain and Cryptocurrency Workshop",
    description:
      "Dive into the world of blockchain and cryptocurrencies. Understand the technology behind Bitcoin and Ethereum and how it's shaping the financial world.",
    date: "2025-01-15",
    location: "Valencia, Spain",
    capacity: "20",
    color: "purple",
    attendants: [
      "hotPotato",
      "interntGoblin",
      "saltySaltyLemon",
      "dolahbillsOnme",
      "theFrog",
      "violetsAreBlue",
      "softySofi",
    ],
  },
  {
    title: "Virtual Reality Expo",
    description:
      "Experience the latest advancements in VR technology. Try out new hardware, play the latest games, and learn about how VR is being used in various industries.",
    date: "2025-02-01",
    location: "Bilbao, Spain",
    capacity: "40",
    color: "lightblue",
    attendants: [
      "Anananastasia",
      "cocoMangoCrispyPollo",
      "saltySaltyLemon",
      "dolahbillsOnme",
      "theFrog",
      "violetsAreBlue",
      "softySofi",
    ],
  },
  {
    title: "Tech Startup Pitch Night",
    description:
      "Watch as tech startups pitch their innovative ideas to a panel of venture capitalists. A great event for entrepreneurs and investors alike.",
    date: "2025-02-28",
    location: "Malaga, Spain",
    capacity: "35",
    color: "aquagreen",
    attendants: [
      "Anananastasia",
      "hotPotato",
      "interntGoblin",
      "saltySaltyLemon",
      "dolahbillsOnme",
      "theFrog",
      "violetsAreBlue",
      "softySofi",
    ],
  },
  {
    title: "Data Science Symposium",
    description:
      "Learn about the latest trends in data science. Hear from industry experts on topics like machine learning, data visualization, and big data.",
    date: "2025-03-15",
    location: "Granada, Spain",
    capacity: "50",
    color: "white",
    attendants: [
      "Anananastasia",
      "cocoMangoCrispyPollo",
      "hotPotato",
      "interntGoblin",
      "saltySaltyLemon",
      "dolahbillsOnme",
      "theFrog",
      "violetsAreBlue",
      "softySofi",
    ],
  },
  {
    title: "Internet of Things Conference",
    description:
      "Discover how the Internet of Things is transforming everyday life. Learn about smart homes, connected devices, and the future of IoT.",
    date: "2025-04-01",
    location: "Cordoba, Spain",
    capacity: "60",
    color: "red",
    attendants: ["Anananastasia"],
  },
  {
    title: "Cloud Computing Forum",
    description:
      "Join us to discuss the future of cloud computing. Learn about the benefits of cloud technology and how it's changing the way businesses operate.",
    date: "2025-04-15",
    location: "Zaragoza, Spain",
    capacity: "45",
    color: "yellow",
    attendants: [
      "Anananastasia",
      "cocoMangoCrispyPollo",
      "hotPotato",
      "interntGoblin",
      "saltySaltyLemon",
      "dolahbillsOnme",
      "theFrog",
      "violetsAreBlue",
      "softySofi",
    ],
  },
  {
    title: "Augmented Reality Showcase",
    description:
      "Experience the latest in augmented reality technology. See how AR is being used in gaming, education, and other industries.",
    date: "2025-05-01",
    location: "Salamanca, Spain",
    capacity: "30",
    color: "orange",
    attendants: [
      "Anananastasia",
      "cocoMangoCrispyPollo",
      "hotPotato",
      "interntGoblin",
      "saltySaltyLemon",
      "dolahbillsOnme",
      "theFrog",
      "violetsAreBlue",
    ],
  },
  {
    title: "Cybersecurity Bootcamp",
    description:
      "Get hands-on experience with cybersecurity. Learn about the latest threats and how to protect yourself and your organization.",
    date: "2025-05-15",
    location: "Vigo, Spain",
    capacity: "40",
    color: "purple",
    attendants: [
      "Anananastasia",
      "cocoMangoCrispyPollo",
      "hotPotato",
      "interntGoblin",
      "saltySaltyLemon",
      "dolahbillsOnme",
      "theFrog",
      "violetsAreBlue",
      "softySofi",
    ],
  },
  {
    title: "Game Developers Gathering",
    description:
      "Meet fellow game developers and learn about the latest trends in game design and development. A must-attend event for anyone in the gaming industry.",
    date: "2025-06-01",
    location: "Alicante, Spain",
    capacity: "50",
    color: "lightblue",
    attendants: [
      "Anananastasia",
      "cocoMangoCrispyPollo",
      "hotPotato",
      "interntGoblin",
      "saltySaltyLemon",
      "dolahbillsOnme",
      "theFrog",
      "violetsAreBlue",
      "softySofi",
    ],
  },
  {
    title: "Tech Leaders Roundtable",
    description:
      "Join a discussion with leaders in the tech industry. Hear about their experiences and get advice on how to succeed in the tech world.",
    date: "2025-06-15",
    location: "Cadiz, Spain",
    capacity: "35",
    color: "aquagreen",
    attendants: [
      "Anananastasia",
      "cocoMangoCrispyPollo",
      "hotPotato",
      "interntGoblin",
      "saltySaltyLemon",
      "dolahbillsOnme",
      "theFrog",
      "violetsAreBlue",
      "softySofi",
    ],
  },
];

const feedEvents = async () => {
  let eventsData = [];
  try {
    await mongoose
      .connect(process.env.DB_URL)
      .then(async () => {
        const allEvents = await Event.find();
        allEvents.length
          ? await Event.collection.drop()
          : console.log(`event collection already empty`);
      })
      .catch((err) =>
        console.log(`error at removing event collection : ${err}`)
      )
      .then(async () => {
        const usersData = await User.find();

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

feedEvents();
