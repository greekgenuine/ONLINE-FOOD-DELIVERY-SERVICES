import express from 'express';
import Cors from 'cors';
import { connectDB } from './config/db.js';
import foodrouter from './routes/foodroute.js';
import userrouter from './routes/userroute.js';
import cartrouter from './routes/cartroute.js';
import orderrouter from './routes/orderroute.js';
import 'dotenv/config';

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(Cors());

// db connection and server start
connectDB().then(() => {
    console.log('Database connected successfully');

    // Serve static files from the "uploads" directory
    app.use('/images', express.static('uploads'));

    // api endpoint
    app.use('/api/user', userrouter);
    app.use('/api/food', foodrouter);
    app.use('/api/cart', cartrouter);
    app.use('/api/order', orderrouter);

    app.get('/', (req, res) => {
        res.send('Hello World');
    });

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
}).catch(error => {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit process with failure
});
/*
express: This imports the Express.js framework, which is used to create the web server and manage routing.
Cors: This imports the CORS (Cross-Origin Resource Sharing) middleware, allowing the server to handle requests from different origins, which is essential in APIs that interact with web applications from different domains.
connectDB: This imports a function to connect to the database (likely MongoDB). The database connection is established before starting the server.
Route Imports (foodrouter, userrouter, etc.): These import route handlers that define endpoints for different resources (food, user, cart, order). Each router handles specific API endpoints related to its resource.
dotenv/config: This loads environment variables from a .env file into process.env, allowing you to configure the application using environment-specific settings (like the port or database credentials).

const app = express();
const port = process.env.PORT || 4000;

app: This creates an instance of an Express application. app is used to set up middleware, routes, and other configurations.

port: The port on which the server will listen for incoming requests is set. It uses an environment variable (process.env.PORT), defaulting to 4000 if not specified.

app.use(express.json());
app.use(Cors());
app: This creates an instance of an Express application. app is used to set up middleware, routes, and other configurations.
port: The port on which the server will listen for incoming requests is set. It uses an environment variable (process.env.PORT), defaulting to 4000 if not specified.

app.use(express.json());
app.use(Cors());
express.json(): This middleware parses incoming JSON requests and makes the parsed data available under req.body. It's essential for handling JSON payloads in POST requests.
Cors(): This middleware enables CORS, allowing your API to handle requests from different domains.

connectDB().then(() => {
    console.log('Database connected successfully');

    // Serve static files from the "uploads" directory
    app.use('/images', express.static('uploads'));

    // api endpoint
    app.use('/api/user', userrouter);
    app.use('/api/food', foodrouter);
    app.use('/api/cart', cartrouter);
    app.use('/api/order', orderrouter);

    app.get('/', (req, res) => {
        res.send('Hello World');
    });

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
}).catch(error => {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit process with failure
});
connectDB(): This function connects to the database. It returns a promise, so .then() and .catch() are used to handle the success or failure of the connection.
Static Files: The app.use('/images', express.static('uploads')) line serves static files from the uploads directory, allowing users to access images stored there via the /images route.
Route Handlers (app.use()): These lines set up the API endpoints, directing requests to the appropriate router (e.g., /api/user requests are handled by userrouter).
Root Route (app.get('/')): This defines a basic route that sends a "Hello World" message when the root URL (/) is accessed.
app.listen(port): This starts the server, making it listen on the specified port (process.env.PORT or 4000). The server starts after successfully connecting to the database.
connectDB(): This function connects to the database. It returns a promise, so .then() and .catch() are used to handle the success or failure of the connection. means this is a promise part in which if connectionis done then app.use('/images', express.static('uploads'));

    // api endpoint
    app.use('/api/user', userrouter);
    app.use('/api/food', foodrouter);
    app.use('/api/cart', cartrouter);
    app.use('/api/order', orderrouter);this part will run 
*/