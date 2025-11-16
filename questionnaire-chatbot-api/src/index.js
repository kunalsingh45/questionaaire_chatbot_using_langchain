
import express from 'express';
import cors from "cors";
import { getAnswer } from './chatAnswer.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/getAnswer', async (req, res) => {
    const answer = await getAnswer(req.body.question);
    res.status(200).json({ answer })
});

app.listen(PORT, (error) => {
    if (!error)
        console.log(`Server is started Successfully and App is listening on port ${PORT}`);
    else
        console.log("Error occurred, server can't start", error);
}
);