import React from "react";

function QuestionItem({ question, handleDeleteQuestions, newQuestions}) {
  const { id, prompt, answers, correctIndex } = question;


  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
 
  function handleDelete() {
 fetch("http://localhost:4000/questions/" + id , {
      method:"DELETE"
    }) 
        .then(response => {
          console.log(response);
          if (!response.ok) {
            throw new Error("Error deleting question");
          }
           return response.json();
        })
          .then(() => {
            handleDeleteQuestions(id);
          })
         .catch(error => {
          console.error("Error:", error)
        
  });
}

  function updateForm (event) {
    const newForm = (event.target.value);
    fetch("http://localhost:4000/questions/" + id,{
       method: "PATCH",
       headers: {
        "Content-Type": "application/json",
       },
       body: JSON.stringify({correctIndex: newForm})
      }) 
        .then((response) => response.json())
        .then((newQuestion) => {
          newQuestions(newQuestion);
    });
  }
   console.log(question)
return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={updateForm}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
   );
  }

export default QuestionItem;
