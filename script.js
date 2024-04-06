var questions = [
    "Do you prefer to spend time alone rather than with a large group of people?",
    "Do you focus on the present rather than thinking about the future?",
    "Do you trust reason rather than feelings?",
    "Do you prefer to have a few close friends rather than many acquaintances?",
    "Do you prefer to make decisions based on facts rather than values?",
    "Do you prefer to follow a plan rather than leave things to chance?",
    "Do you prefer to be organized rather than adapt to changing circumstances?",
    "Do you prefer to express yourself through actions rather than words?",
    "Do you prefer to stick to your routines rather than trying new things?",
    "Do you prefer to be decisive rather than open-minded?",
    "Do you prefer to be firm and assertive rather than gentle and accommodating?",
    "Do you prefer to be focused and determined rather than flexible and spontaneous?",
    "Do you prefer to be independent rather than rely on others?",
    "Do you prefer to be objective rather than subjective?",
    "Do you prefer to be reserved rather than outgoing?",
    "Do you prefer to be systematic rather than casual?"
];

function createQuestionElement(question, index) {
    var questionElement = document.createElement("div");
    questionElement.className = "question";
    questionElement.innerHTML = `
        <p>${question}</p>
        <button onclick="answerQuestion(${index}, 'yes')">Yes</button>
        <button onclick="answerQuestion(${index}, 'no')">No</button>
    `;
    return questionElement;
}

function renderQuestions() {
    var questionsContainer = document.getElementById("questions");
    questions.forEach(function(question, index) {
        questionsContainer.appendChild(createQuestionElement(question, index));
    });
}

var answers = [];

function answerQuestion(index, answer) {
    answers[index] = answer;
}

function classifyMBTI() {
    var introvert = answers[0] === 'yes';
    var sensing = answers[1] === 'yes';
    var thinking = answers[2] === 'yes';
    var judging = answers[3] === 'yes';

    var personalityType = ""; // Placeholder for the personality type

    if (introvert) {
        if (sensing) {
            if (thinking) {
                if (judging) {
                    personalityType = "ISTJ";
                } else {
                    personalityType = "ISTP";
                }
            } else {
                if (judging) {
                    personalityType = "ISFJ";
                } else {
                    personalityType = "ISFP";
                }
            }
        } else {
            if (thinking) {
                if (judging) {
                    personalityType = "INTJ";
                } else {
                    personalityType = "INTP";
                }
            } else {
                if (judging) {
                    personalityType = "INFJ";
                } else {
                    personalityType = "INFP";
                }
            }
        }
    } else {
        if (sensing) {
            if (thinking) {
                if (judging) {
                    personalityType = "ESTJ";
                } else {
                    personalityType = "ESTP";
                }
            } else {
                if (judging) {
                    personalityType = "ESFJ";
                } else {
                    personalityType = "ESFP";
                }
            }
        } else {
            if (thinking) {
                if (judging) {
                    personalityType = "ENTJ";
                } else {
                    personalityType = "ENTP";
                }
            } else {
                if (judging) {
                    personalityType = "ENFJ";
                } else {
                    personalityType = "ENFP";
                }
            }
        }
    }

    document.getElementById("result").innerHTML = "Your MBTI personality type is: " + personalityType;
}

renderQuestions();

var redirectUrl = "";
switch (personalityType) {
  case "ISTJ":
    redirectUrl = "https://www.example.com/istj";
    break;
  case "ISFJ":
    redirectUrl = "https://www.example.com/isfj";
    break;
  case "INFJ":
    redirectUrl = "https://www.example.com/infj";
    break;
  case "INTJ":
    redirectUrl = "https://www.example.com/intj";
    break;;lk n
  case "ISTP":
    redirectUrl = "https://www.example.com/istp";
    break;
  case "ISFP":
    redirectUrl = "https://www.example.com/isfp";
    break;
  case "INFP":
    redirectUrl = "https://www.example.com/infp";
    break;
  case "INTP":
    redirectUrl = "https://www.example.com/intp";
    break;
  case "ESTJ":
    redirectUrl = "https://www.example.com/estj";
    break;
  case "ESFJ":
    redirectUrl = "https://www.example.com/esfj";
    break;
  case "ENFJ":
    redirectUrl = "https://www.example.com/enfj";
    break;
  case "ENTJ":
    redirectUrl = "https://www.example.com/entj";
    break;
  case "ESTP":
    redirectUrl = "https://www.example.com/estp";
    break;
  case "ESFP":
    redirectUrl = "https://www.example.com/esfp";
    break;
  case "ENFP":
    redirectUrl = "https://www.example.com/enfp";
    break;
  case "ENTP":
    redirectUrl = "https://www.example.com/entp";
    break;
}
window.location.href = redirectUrl;
