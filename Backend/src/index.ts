import './configs/database';
import express, { Application } from 'express';
import UserRoute from './routes/UserRoute';
import MicroControllerRoute from './routes/MicroControllerRoute';

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', UserRoute);
app.use('/micro_controller', MicroControllerRoute);

const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});