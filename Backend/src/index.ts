import './configs/database';
import express, { Application } from 'express';
import UserRoute from './routes/UserRoute';

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', UserRoute);

const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});