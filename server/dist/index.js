"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const auth_2 = __importDefault(require("./middleware/auth"));
const cors_1 = __importDefault(require("cors"));
const roles_1 = require("./routes/roles");
const user_1 = __importDefault(require("./routes/user"));
// Load environment variables from .env file
dotenv_1.default.config();
// Initialize express
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware to parse JSON
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// MongoDB connection logic
const mongoURI = process.env.MONGO_URI;
mongoose_1.default
    .connect(mongoURI)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process if MongoDB connection fails
});
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/roles', roles_1.rolesRouter);
app.use('/api/users', user_1.default);
// Protected route example
app.get('/protected', auth_2.default, (req, res) => {
    res.json({ message: 'This is a protected route' });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
