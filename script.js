const title = document.getElementById("title");
const description = document.getElementById("description");
const submit = document.getElementById("submit");
const questionList = document.getElementById("questionList");
const rightsideData = document.getElementById("rightsideData");
const rightquestionList = document.getElementById("rightquestionList");
const rightanswerList = document.getElementById("rightresponseList");
const newQuestion = document.getElementById("newQuestion");
const responder = document.getElementById("responder");
const responderName = document.getElementById("responderName");
const responderAnswerr = document.getElementById("responderAnswer");
const responderbtn = document.getElementById("responderbtn");
const responsehead = document.getElementById("responsehead");
const header = document.getElementById("header");
const headerQuestion = document.getElementById("headerQuestion");
const search = document.getElementById("search");
let todelete;
var allQuestions = [];
var selectedQuestions = null;
const QUESTIONS = "Questions";

const addDataFromStorage = () => {
  let questions = localStorage.getItem(QUESTIONS);
  if (questions) {
    questions = JSON.parse(questions);
  } else {
    questions = [];
  }

  allQuestions = questions;
  questions.forEach((element) => {
    addDataToUI(element);
  });
};

submit.addEventListener("click", () => {
  const titleVal = title.value;
  const descriptionVal = description.value;

  const newdataobj = {
    title: titleVal,
    description: descriptionVal,
    comments: [],
  };
  console.log(newdataobj);

  let questions = localStorage.getItem(QUESTIONS);
  if (questions) {
    questions = JSON.parse(questions);
  } else {
    questions = [];
  }

  questions.push(newdataobj);
  localStorage.setItem(QUESTIONS, JSON.stringify(questions));
  allQuestions = questions;
  addDataToUI(newdataobj);

  title.value = "";
  description.value = "";
});

const addDataToUI = (newdataobj) => {
  const container = document.createElement("div");
  container.classList.add("questionlist");
  const title = document.createElement("h2");
  const description = document.createElement("p");

  title.innerHTML = newdataobj.title;
  description.innerHTML = newdataobj.description;

  container.appendChild(title);
  container.appendChild(description);

  questionList.appendChild(container);

  container.addEventListener("click", () => {
    todelete = container;
    handleClick(newdataobj);
  });
};

const handleClick = (newdataobj) => {
  rightsideData.style.display = "none";
  rightquestionList.innerHTML = "";
  rightanswerList.innerHTML = "";
  responder.style.display = "block";
  responsehead.style.display = "block";
  rightanswerList.style.display = "block";
  rightquestionList.style.display = "block";
  headerQuestion.style.display = "block";
  header.style.display = "none";

  selectedQuestions = newdataobj;

  const container = document.createElement("div");
  container.classList.add("questionlist");
  const title = document.createElement("h2");
  const description = document.createElement("p");

  title.innerHTML = newdataobj.title;
  description.innerHTML = newdataobj.description;

  container.appendChild(title);
  container.appendChild(description);

  rightquestionList.appendChild(container);

  //  adding comments
  newdataobj.comments.forEach((ele) => {
    const anscontainer = document.createElement("div");
    anscontainer.classList.add("responselist");
    const title = document.createElement("h4");
    const description = document.createElement("p");

    title.innerHTML = ele.name;
    description.innerHTML = ele.answer;

    anscontainer.appendChild(title);
    anscontainer.appendChild(description);

    rightanswerList.appendChild(anscontainer);
  });

  const resolve = document.createElement("button");
  resolve.innerHTML = "resolve";
  resolve.classList.add("btn", "btn-primary", "resolve");
  container.appendChild(resolve);

  resolve.addEventListener("click", () => {
    let selectedQuestionsIndex = allQuestions.indexOf(selectedQuestions);
    allQuestions.splice(selectedQuestionsIndex, 1);
    questionList.removeChild(todelete);

    responder.display = "none";

    rightsideData.style.display = "block";
    responsehead.style.display = "none";
    responder.style.display = "none";
    rightquestionList.innerHTML = "";
    rightanswerList.innerHTML = "";
    rightanswerList.style.display = "none";
    rightquestionList.display = "none";
    headerQuestion.style.display = "none";
    header.style.display = "block";
    console.log(container);

    // rightquestionList.removeChild(container);

    localStorage.setItem(QUESTIONS, JSON.stringify(allQuestions));
  });
};

newQuestion.addEventListener("click", () => {
  rightsideData.style.display = "block";
  responsehead.style.display = "none";
  responder.style.display = "none";
  rightquestionList.innerHTML = "";
  rightanswerList.innerHTML = "";
  rightanswerList.style.display = "none";
  rightquestionList.display = "none";
  headerQuestion.style.display = "none";
  header.style.display = "block";
});

responderbtn.addEventListener("click", () => {
  const name = responderName.value;
  const ans = responderAnswerr.value;

  const anscontainer = document.createElement("div");
  anscontainer.classList.add("responselist");
  const title = document.createElement("h2");
  const description = document.createElement("p");

  title.innerText = name;
  description.innerText = ans;

  anscontainer.appendChild(title);
  anscontainer.appendChild(description);
  rightanswerList.appendChild(anscontainer);

  let selectedQuestionsIndex = allQuestions.indexOf(selectedQuestions);
  console.log(selectedQuestionsIndex);
  let question = allQuestions[selectedQuestionsIndex];
  console.log(question);
  question.comments.push({ name: name, answer: ans });
  // allQuestions[selectedQuestionsIndex]=question;

  localStorage.setItem(QUESTIONS, JSON.stringify(allQuestions));

  responderName.value = "";
  responderAnswerr.value = "";
});

search.addEventListener("keyup", (e) => {
  // console.log(e.target.value);

  let val = e.target.value;
  questionList.innerHTML = "";

  allQuestions.forEach((e) => {
    if (e.title.includes(val) || e.description.includes(val)) {
      addDataToUI(e);
    } else {
      //questionList.innerHTML = "No match found!";
    }
  });
});

addDataFromStorage();
