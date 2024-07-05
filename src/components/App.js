import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import QuestionItem from "./QuestionItem";

function App() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState("List");
  
useEffect(() => {    
  fetch("http://localhost:4000/questions/")
     .then ((response) => response.json())
     .then((question) => setQuestions(question));
  }, []);

  function addQuestion(newQuest) {
    setQuestions([...questions, newQuest])
  }

function handleDeleteQuestions(id){
    const updatedQuestions = questions.filter((question) => question.id !== id);
      setQuestions(updatedQuestions);
}

return (
  <main>
    <AdminNavBar onChangePage={setPage} />
    {page === "Form" ? <QuestionForm addQuestion={addQuestion} /> : <QuestionList questions={questions} handleDeleteQuestions={handleDeleteQuestions}/>}
  </main>
);
}

export default App;
