const questions = [
  {
    question: "Какой язык работает в браузере?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 4,
  },
  {
    question: "Что означает CSS?",
    answers: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    correct: 2,
  },
  {
    question: "Что означает HTML?",
    answers: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborginis",
    ],
    correct: 1,
  },
  {
    question: "В каком году был создан JavaScript?",
    answers: ["1996", "1995", "1994", "все ответы неверные"],
    correct: 2,
  },
];

//? находим элементы
const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");

//? переменные игры
let score = 0; // кол-во правильных ответов
let questionIndex = 0; // текущий вопрос

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
}

function showQuestion() {
  //? вопрос
  const headerTemplate = `<h2 class="title">%title%</h2>`;
  const title = headerTemplate.replace(
    "%title%",
    questions[questionIndex]["question"]
  );
  headerContainer.innerHTML = title;

  //? варианты ответов
  for ([index, answerText] of questions[questionIndex]["answers"].entries()) {
    const questionTamplate = `
  <li>
    <label>
      <input value="%number%" type="radio" class="answer" name="answer" />
      <span>%answer%</span>
    </label>
  </li>`;

    const answerHTML = questionTamplate
      .replace("%answer%", answerText)
      .replace("%number%", answerText);

    listContainer.innerHTML += answerHTML;
  }
}

function checkAnswer() {
  //? находим выбранную радиокнопку
  const checkedRadio = listContainer.querySelector("input:checked");

  //? если ответ не выбран - ничего не делаем, выходим из функции
  if (!checkedRadio) {
    submitBtn.blur();
    return;
  }

  //? узнаём номер ответа пользователя
  const userAnswer = parseInt(checkedRadio.value);

  //? если ответ верно - увеличиваем счет
  questions[questionIndex]["correct"];
  if (userAnswer === questions[questionIndex]["correct"]) {
    score++;
  }

  if (questionIndex !== questions.length - 1) {
    questionIndex++;
    clearPage();
    showQuestion();
  } else {
    clearPage();
    showResults();
  }
}

function showResults() {
  const resultsTemplate = `
    <h2 class="title">%title%</h2>
    <h3 class="summary">%message%</h3>
    <p class="result">%result%</p>
  `;
  let title, message;
  //? варианты заголовков и текстов
  if (score === questions.lenght) {
    title = "Поздравляем!";
    message = "Вы ответили верно на все вопросы!";
  } else if ((score * 100) / questions.length >= 50) {
    title = "Неплохой результат!";
    message = "Вы дали более половины правильных ответов!";
  } else {
    title = "Стоит постораться";
    message = "Пока у вас меньше половины правильных ответов!";
  }
  //? результат
  let result = `${score} из ${questions.length}`;

  //? финальный ответ, подставляем данные в шаблон
  const finalMessage = resultsTemplate
    .replace("%title%", title)
    .replace("%message%", message)
    .replace("%result%", result);

  headerContainer.innerHTML = finalMessage;
}
