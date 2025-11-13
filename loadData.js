const mongoose = require("mongoose");
const Cabin = require("./models/cabinModel");
const User = require("./models/userModel");
const Booking = require("./models/bookingModel");
const { subDays, startOfDay } = require("date-fns");
const period = 7;
const cabins = [
  {
    cabin: "001",
    capacity: 2,
    price: 400,
    Discount: 0,
    cabin_image:
      "https://amoeidozdmndtgzcmxdc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg",
    description:
      "Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.",
  },
  {
    cabin: "002",
    capacity: 2,
    price: 350,
    Discount: 25,
    cabin_image:
      "https://amoeidozdmndtgzcmxdc.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg",
    description:
      "Escape to the serenity of nature and indulge in luxury in our cozy cabin 002. Perfect for couples, this cabin offers a secluded and intimate retreat in the heart of a picturesque forest. Inside, you will find warm and inviting interiors crafted from high-quality wood, a comfortable living area, a fireplace and a fully-equipped kitchen. The luxurious bedroom features a plush king-size bed and spa-like shower. Relax on the private deck with hot tub and take in the beauty of nature.",
  },
  {
    cabin: "003",
    capacity: 4,
    price: 300,
    Discount: 0,
    cabin_image:
      "https://amoeidozdmndtgzcmxdc.supabase.co/storage/v1/object/public/cabin-images/cabin-003.jpg",
    description:
      "Experience luxury family living in our medium-sized wooden cabin 003. Perfect for families of up to 4 people, this cabin offers a comfortable and inviting space with all modern amenities. Inside, you will find warm and inviting interiors crafted from high-quality wood, a comfortable living area, a fireplace, and a fully-equipped kitchen. The bedrooms feature plush beds and spa-like bathrooms. The cabin has a private deck with a hot tub and outdoor seating area, perfect for taking in the natural surroundings.",
  },
  {
    cabin: "004",
    capacity: 4,
    price: 450,
    Discount: 50,
    cabin_image:
      "https://amoeidozdmndtgzcmxdc.supabase.co/storage/v1/object/public/cabin-images/cabin-004.jpg",
    description:
      "Indulge in the ultimate luxury family vacation in this medium-sized cabin 004. Designed for families of up to 4, this cabin offers a sumptuous retreat for the discerning traveler. Inside, the cabin boasts of opulent interiors crafted from the finest quality wood, a comfortable living area, a fireplace, and a fully-equipped gourmet kitchen. The bedrooms are adorned with plush beds and spa-inspired en-suite bathrooms. Step outside to your private deck and soak in the natural surroundings while relaxing in your own hot tub.",
  },
  {
    cabin: "005",
    capacity: 6,
    price: 350,
    Discount: 0,
    cabin_image:
      "https://amoeidozdmndtgzcmxdc.supabase.co/storage/v1/object/public/cabin-images/cabin-005.jpg",
    description:
      "Enjoy a comfortable and cozy getaway with your group or family in our spacious cabin 005. Designed to accommodate up to 6 people, this cabin offers a secluded retreat in the heart of nature. Inside, the cabin features warm and inviting interiors crafted from quality wood, a living area with fireplace, and a fully-equipped kitchen. The bedrooms are comfortable and equipped with en-suite bathrooms. Step outside to your private deck and take in the natural surroundings while relaxing in your own hot tub.",
  },
  {
    cabin: "006",
    capacity: 6,
    price: 800,
    Discount: 100,
    cabin_image:
      "https://amoeidozdmndtgzcmxdc.supabase.co/storage/v1/object/public/cabin-images/cabin-006.jpg",
    description:
      "Experience the epitome of luxury with your group or family in our spacious wooden cabin 006. Designed to comfortably accommodate up to 6 people, this cabin offers a lavish retreat in the heart of nature. Inside, the cabin features opulent interiors crafted from premium wood, a grand living area with fireplace, and a fully-equipped gourmet kitchen. The bedrooms are adorned with plush beds and spa-like en-suite bathrooms. Step outside to your private deck and soak in the natural surroundings while relaxing in your own hot tub.",
  },
  {
    cabin: "007",
    capacity: 8,
    price: 500,
    Discount: 100,
    cabin_image:
      "https://amoeidozdmndtgzcmxdc.supabase.co/storage/v1/object/public/cabin-images/cabin-007.jpg",
    description:
      "Accommodate your large group or multiple families in the spacious and grand wooden cabin 007. Designed to comfortably fit up to 8 people, this cabin offers a secluded retreat in the heart of beautiful forests and mountains. Inside, the cabin features warm and inviting interiors crafted from quality wood, multiple living areas with fireplace, and a fully-equipped kitchen. The bedrooms are comfortable and equipped with en-suite bathrooms. The cabin has a private deck with a hot tub and outdoor seating area, perfect for taking in the natural surroundings.",
  },
  {
    cabin: "008",
    capacity: 10,
    price: 14000,
    Discount: 0,
    cabin_image:
      "https://amoeidozdmndtgzcmxdc.supabase.co/storage/v1/object/public/cabin-images/cabin-008.jpg",
    description:
      "Experience the epitome of luxury and grandeur with your large group or multiple families in our grand cabin 008. This cabin offers a lavish retreat that caters to all your needs and desires. The cabin features an opulent design and boasts of high-end finishes, intricate details and the finest quality wood throughout. Inside, the cabin features multiple grand living areas with fireplaces, a formal dining area, and a gourmet kitchen that is a chef's dream. The bedrooms are designed for ultimate comfort and luxury, with plush beds and en-suite spa-inspired bathrooms. Step outside and immerse yourself in the beauty of nature from your private deck, featuring a luxurious hot tub and ample seating areas for ultimate relaxation and enjoyment.",
  },
];

const users = [
  {
    userName: "johndoe",
    email: "johndoe@example.com",
    password: "yourPassword123!",
    country: "United States",
    countryCode: "US",
    profile: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    userName: "johndoe11",
    email: "johndoe11@example.com",
    password: "yourPassword1@",
    country: "India",
    countryCode: "IN",
    profile: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    userName: "sarahm",
    email: "sarah.miller@example.com",
    password: "Sarah@2025#",
    country: "Canada",
    countryCode: "CA",
    profile: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    userName: "liwei88",
    email: "li.wei@example.cn",
    password: "Wei@Secure9",
    country: "China",
    countryCode: "CN",
    profile: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    userName: "emmarose",
    email: "emma.rose@example.co.uk",
    password: "Rose!321@",
    country: "United Kingdom",
    countryCode: "GB",
    profile: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    userName: "carlosp",
    email: "carlos.perez@example.mx",
    password: "Pass@Carlos9",
    country: "Mexico",
    countryCode: "MX",
    profile: "https://randomuser.me/api/portraits/men/6.jpg",
  },
];

async function createMultipleDocs(data, Model) {
  try {
    await mongoose.connect("mongodb://localhost:27017/the-world-oasis");
    const today = new Date();
    const bookings = await Booking.find({
      startDate: {
        $gte: subDays(startOfDay(today), period),
        $lt: startOfDay(today),
      },
      status: "checked in",
    });
    console.log(subDays(startOfDay(today), period));
    console.log(startOfDay(today));

    return bookings;
    // const result = await Model.insertMany(data);

    // console.log("Inserted documents:", result);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    mongoose.connection.close();
  }
}

createMultipleDocs(users, User).then((data) => console.log(data));
