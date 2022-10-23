require("dotenv").config()
const PORT = process.env.PORT
const app = require("./src/app")
app.listen(PORT , ()=> {console.log(`http:localhost${PORT}`)})

// const start = async () => {
//     try {
//       app.listen(PORT, () => console.log("Server started on port 3000"));
//     } catch (error) {
//       console.error(error);
//       process.exit(1);
//     }
//   };
  
//   start();