import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { generateQuiz } from "./openai";

function QuizGenerator() {
    const [prompt, setPrompt] = useState("");
    const [count, setCount] = useState(10);
    const [right, setRight] = useState(0)
    const [wrong, setWrong] = useState(0)
    const [index, setIndex] = useState(1)
    const [quizQuestion, setQuizQuestion] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
        } catch (e) { }
        setLoading(true)
        const question = await generateQuiz(prompt);
        setQuizQuestion(question);
        setLoading(false)
    };



    const QuizUI = (props) => {
        const [selected, setSelected] = useState('');

        function splitQuiz(data) {
            console.log(data);

            try {
                return JSON.parse(data).quiz;
            } catch (e) {
                return {
                    question: "Something went wrong, Please try again",
                    options: [],
                    correctAnswer: ""
                }
            }
        }

        function getArray() {
            try {
                return splitQuiz(props.data).options;
            } catch (e) {
                return [];
            }
        }



        function next() {
            try {
                let qq = splitQuiz(props.data);
                if (selected === qq.correctAnswer) {
                    let tt = right + 1;
                    setRight(tt);
                } else {
                    let tt = wrong + 1;
                    setWrong(tt);
                }
            } catch (e) { }
            let t = index + 1;
            setIndex(t);
            if (index <= count) {
                handleSubmit(null);
            } else {
                alert(`Completed: Correct: ${right} / Incorrect: ${wrong}`);
                setQuizQuestion(null);
                setIndex(1);
                setWrong(0);
                setRight(0);
                setPrompt('');
            }
        }



        return (
            <Stack alignItems={'center'}>
                <h1>Quiz about "{prompt}"</h1>
                <br />
                <br />
                <br />
                <FormControl>
                    <Typography
                        sx={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                        }}
                        id="demo-row-radio-buttons-group-label">{splitQuiz(props.data).question}</Typography>
                    <br />
                    <label>Correct: {right} / Incorrect: {wrong}</label>
                    <br />
                    <RadioGroup
                        row={false}
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        {
                            getArray().map((option, i) => {
                                return (
                                    <FormControlLabel
                                        onClick={() => setSelected(option)}
                                        key={i}
                                        value={option}
                                        checked={selected === option}
                                        control={<Radio />} label={option} />
                                )
                            })
                        }

                    </RadioGroup>
                    <br />
                    <Button variant="contained" onClick={next}>Next</Button>
                </FormControl>
            </Stack>
        )
    }

    return (
        <div>
            <center>

                {
                    !quizQuestion ?
                        <form onSubmit={handleSubmit}>
                            <h1>Quiz Generator</h1>
                            <br />
                            <TextField value={prompt} onChange={(e) => setPrompt(e.target.value)} label={'Enter a theme'} />
                            <br />
                            <TextField sx={{ mt: 2 }} type="number" value={count} onChange={(e) => setCount(e.target.value)} label={'Enter count of questions'} />
                            <br />
                            <br />
                            <Button variant="contained" type="submit">Generate Quiz With AI</Button>
                        </form>
                        : null
                }
                {loading && !quizQuestion ? <div><br />
                    <br />
                    <br /><CircularProgress /></div> : null}
                {quizQuestion &&
                    <div>
                        {
                            loading ? <div>
                                <br />
                                <br />
                                <br />
                                <CircularProgress />
                                <br />
                                Please wait...
                            </div> : <QuizUI data={quizQuestion} />
                        }
                    </div>
                }
            </center>
        </div>
    );
}

export default QuizGenerator;
