import React, { useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({  handleDeleteQuestions, newQuestions}) {
  const [fetchedQuestions, setFetchedQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(response => response.json())
      .then((fetchedQuestions) => setFetchedQuestions(fetchedQuestions));
      },   []);
function handleDelete(id) {
  fetch("http://localhost:4000/questions/" + id, {
     method: "DELETE"
   })
     .then(response => {
       if(!response.ok) {
         throw new Error("Error deleting question");
         }
       })
        .then(() => {
          const updatedQuestions = fetchedQuestions.filter(question => question.id !== id);
          setFetchedQuestions(updatedQuestions);
        });
}
  return (
      <section>
        <h1>Quiz Questions</h1>
        <ul>
          {fetchedQuestions.map((question) => (
          <QuestionItem 
           key={question.id}  
           question={question} 
           handleDeleteQuestions={handleDelete}
           newQuestions={newQuestions}
         />
        ))}
        </ul>
    </section>
  );
}

export default QuestionList;
