const app = require('./app');
const cloudinary = require("cloudinary").v2;

const connectDatabase = require("./config/database");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });


// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//connecting to database
connectDatabase();

cloudinary.config({
  cloud_name: "dkyyqvbna",
  api_key: "368228333932484",
  api_secret: "EaIv9OI8kTcHYA-ksztikEw7J54",
});

const server = app.listen(process.env.PORT ,()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})
// unhandled promise rejection 

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });
  