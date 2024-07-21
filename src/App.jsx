import { useState, useEffect } from "react";
import { decode } from 'html-entities';
import Question from "./Question";
function App() {
  const [questionCount, setQuestionCount] = useState(4);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({})

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=${questionCount}&type=multiple`)
      .then((response) => response.json())
      .then((data) => {
        // Decode HTML entities in the questions
        const decodedQuestions = data.results.map((question) => ({
          ...question,
          question: decode(question.question),
          correct_answer: decode(question.correct_answer),
          incorrect_answers: question.incorrect_answers.map((answer) =>
            decode(answer)
          ),
        allAnswers: [...question.incorrect_answers, question.correct_answer].map(answer=>{
          return {
            text: decode(answer),
            bgColor: 'bg-white'

          }
        }) //Add .shuffle() to randomize places of answers (later)

        }));
        setQuestions(decodedQuestions);
      });
  }, []);
  function handleAnswerChange(answer, questionIndex){
    setSelectedAnswers(prevState => {
      return{
        ...prevState,
        [questionIndex]: answer,
      }
    })
  }
  function checkAnswers() {
    setQuestions((prevQuestions) =>
        prevQuestions.map((question, index) => {
            // Determine if the selected answer is correct
            const isCorrect = selectedAnswers[index] === question.correct_answer;

            // Update the bgColor of each answer
            const updatedAnswers = question.allAnswers.map((answer) => ({
                ...answer,
                bgColor: answer.text === selectedAnswers[index]
                        ? isCorrect
                            ? 'bg-green-300'
                            : 'bg-red-300'
                        : 'bg-white',
            }));

            return {
                ...question,
                allAnswers: updatedAnswers,
            };
        })
    );

    console.log(selectedAnswers);
}

  function Questions(){
    return(
      questions.map((question, index) => {
        return <Question key={index} index={index} qObj={question} selectedAnswer={selectedAnswers[index]} handleAnswerChange={handleAnswerChange} bgColor={question.bgColor || null}/>;
      })
    )
  }
  console.log(selectedAnswers)
  return (
    <div className="flex flex-col">
      <Questions />
      <button onClick={()=> checkAnswers()} className="border text-center p-4 w-fit mx-auto mt-5">Check answers</button>
    </div>
  );
}
export default App;
