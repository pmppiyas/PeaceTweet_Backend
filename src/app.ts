import express, { type Application} from "express";
import cookieParser from 'cookie-parser';
import cors from "cors"
import compression from "compression";

const app:  Application = express();

app.use(cookieParser());

app.use(
  cors({
    origin: [],
    credentials:  true
  })
)

app.use(express.json());
app.set('trust proxy', 1);
app.use(compression());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.send('Welcome to the PeaceTwwet Server!');
});


app.use((req, res,) => {
  res.status(404).json({
    success: false,
    message: 'Route Not Found',
  });
});


export default app;
