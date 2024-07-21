import { useState, useEffect } from 'react'
export default function Question({ qObj, index, selectedAnswer, handleAnswerChange, bgColor }) {
    const answerButtons = qObj.allAnswers.map((answer, idx) => {
        const {text, bgColor} = answer
        const name = `q${index}`
        return(
                <label
                key={idx}
                className={`m-2 p-2 border rounded cursor-pointer ${selectedAnswer == text ? `${bgColor} shadow-inner shadow-black` : "bg-none" }`}
                onClick={
                    ()=> handleAnswerChange(text, index)
                }
                >
                {text}
                <input
                    hidden 
                    type="radio" 
                    name={name} 
                    className="border px-4 py-2 text-center" 
                    value={text}
                    onChange={()=> handleAnswerChange(text, index)}
                 />
                </label>
            
        )
        });
    return (
      <div className="space-y-5">
        <h1 className='mt-5 text-lg font-bold'>{qObj.question}</h1>
        <div className='flex text-center text-sm'>
            {answerButtons}

        </div>
        <hr />
        
      </div>
    );
  }