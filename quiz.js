const questions = [
    { text: "Do you enjoy social gatherings and meeting new people?", trait: "E" },
    { text: "Do you prefer detailed instructions over general guidelines?", trait: "S" },
    { text: "Do you make decisions based on logic rather than emotions?", trait: "T" },
    { text: "Do you like to have things decided rather than keep options open?", trait: "J" },
    { text: "Is your posture usually open and expressive?", trait: "BL_Open" },
    { text: "Do you prefer classic clothing styles over trendy ones?", trait: "Style" },
];

const bodyTypes = ["Ectomorph (slim)", "Mesomorph (athletic)", "Endomorph (curvy/round)"];
const genders = ["Male", "Female", "Other"];

let currentQuestionIndex = 0;
let answers = {};
let userInfo = {};

function createQuestionElement() {
    const container = document.createElement("div");
    container.className = "question";
    container.style.padding = "24px";
    container.style.background = "#22222";
    container.style.borderRadius = "12px";
    container.style.boxShadow = "0 2px 8px rgba(0,0,0,0.07)";

    if (currentQuestionIndex < questions.length) {
        const q = questions[currentQuestionIndex];
        container.innerHTML = `
            <p style="font-size:1.2em;font-weight:500;">${q.text}</p>
            <div style="margin:12px 0;">
                <label style="margin-right:20px;">
                    <input type="radio" name="answer" value="yes"> Yes
                </label>
                <label>
                    <input type="radio" name="answer" value="no"> No
                </label>
            </div>
            <button onclick="submitAnswer()" style="padding:8px 20px;border:none;background:#0078d4;color:#fff;border-radius:6px;cursor:pointer;">Next</button>
        `;
    } else if (currentQuestionIndex === questions.length) {
        container.innerHTML = `
            <p style="font-size:1.1em;">Select your body type:</p>
            <div style="margin-bottom:10px;">
                ${bodyTypes.map((type) => `<label style="margin-right:15px;"><input type="radio" name="bodyType" value="${type}"> ${type}</label>`).join('')}
            </div>
            <p style="font-size:1.1em;">Select your gender:</p>
            <div style="margin-bottom:10px;">
                ${genders.map((g) => `<label style="margin-right:15px;"><input type="radio" name="gender" value="${g}"> ${g}</label>`).join('')}
            </div>
            <p style="font-size:1.1em;">Enter your age:</p>
            <input type="number" name="age" min="10" max="100" style="padding:4px 8px;border-radius:4px;border:1px solid #ccc;">
            <br><br>
            <button onclick="submitUserInfo()" style="padding:8px 20px;border:none;background:#0078d4;color:#fff;border-radius:6px;cursor:pointer;">See Result</button>
        `;
    }
    return container;
}

function renderQuestion() {
    const questionsContainer = document.getElementById("questions");
    questionsContainer.innerHTML = '';
    questionsContainer.appendChild(createQuestionElement());
}

window.submitAnswer = function() {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) return alert("Please select an answer.");
    answers[questions[currentQuestionIndex].trait] = selected.value;
    currentQuestionIndex++;
    renderQuestion();
};

window.submitUserInfo = function() {
    const bodyType = document.querySelector('input[name="bodyType"]:checked');
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.querySelector('input[name="age"]');
    if (!bodyType || !gender || !age.value) return alert("Please fill all fields.");
    userInfo.bodyType = bodyType.value;
    userInfo.gender = gender.value;
    userInfo.age = age.value;
    showResult();
};

function getMBTI() {
    let mbti = "";
    mbti += answers["E"] === "yes" ? "E" : "I";
    mbti += answers["S"] === "yes" ? "S" : "N";
    mbti += answers["T"] === "yes" ? "T" : "F";
    mbti += answers["J"] === "yes" ? "J" : "P";
    return mbti;
}

function getMBTIDescription(mbti) {
    const descriptions = {
        "ESTJ": "Practical, organized, and logical. You value structure and efficiency.",
        "ISTJ": "Responsible, reserved, and detail-oriented. You prefer order and tradition.",
        "ESFJ": "Warm, outgoing, and supportive. You enjoy helping others and value harmony.",
        "ISFJ": "Loyal, considerate, and attentive. You are caring and value stability.",
        "ESTP": "Energetic, perceptive, and action-oriented. You enjoy excitement and hands-on activities.",
        "ISTP": "Analytical, independent, and adaptable. You like solving problems practically.",
        "ESFP": "Sociable, spontaneous, and fun-loving. You enjoy living in the moment.",
        "ISFP": "Gentle, sensitive, and artistic. You value personal freedom and creativity.",
        "ENTJ": "Strategic, assertive, and efficient. You are a natural leader.",
        "INTJ": "Innovative, independent, and insightful. You value knowledge and competence.",
        "ENTP": "Inventive, curious, and outspoken. You enjoy debating and exploring new ideas.",
        "INTP": "Logical, abstract, and independent. You love theoretical concepts.",
        "ENFJ": "Charismatic, empathetic, and organized. You inspire and support others.",
        "INFJ": "Idealistic, insightful, and compassionate. You seek meaning and connection.",
        "ENFP": "Enthusiastic, imaginative, and sociable. You value creativity and relationships.",
        "INFP": "Thoughtful, reserved, and empathetic. You are guided by your values.",
    };
    return descriptions[mbti] || "A unique blend of traits. You have a balanced personality.";
}

function getPrediction(mbti, bodyType, stylePref, bodyLang, gender, age) {
    // Simple logic for demonstration; can be expanded
    let prediction = "";
    if (mbti[0] === "E" && stylePref === "Classic" && bodyLang === "Open/Expressive") {
        prediction = "You likely enjoy being noticed and express yourself confidently through timeless fashion.";
    } else if (mbti[0] === "I" && stylePref === "Trendy" && bodyLang === "Closed/Reserved") {
        prediction = "You may prefer subtle, modern looks and value comfort over attention.";
    } else if (bodyType.includes("Mesomorph")) {
        prediction = "Your athletic build allows you to experiment with various styles.";
    } else if (bodyType.includes("Ectomorph")) {
        prediction = "Slim fits and layered looks may suit you best.";
    } else if (bodyType.includes("Endomorph")) {
        prediction = "Structured clothing and darker shades can enhance your natural curves.";
    } else {
        prediction = "Your unique combination suggests you can adapt to many styles!";
    }
    // Add age/gender nuance
    if (age < 20) prediction += " As a young individual, feel free to explore and experiment!";
    if (gender === "Female" && stylePref === "Classic") prediction += " Feminine classic pieces will highlight your elegance.";
    if (gender === "Male" && stylePref === "Trendy") prediction += " Modern, sharp trends can complement your look.";
    return prediction;
}

function showResult() {
    const mbti = getMBTI();
    const mbtiDesc = getMBTIDescription(mbti);
    const bodyLang = answers["BL_Open"] === "yes" ? "Open/Expressive" : "Closed/Reserved";
    const stylePref = answers["Style"] === "yes" ? "Classic" : "Trendy";
    const prediction = getPrediction(
        mbti,
        userInfo.bodyType,
        stylePref,
        bodyLang,
        userInfo.gender,
        userInfo.age
    );
    const resultHTML = `
        <div style="padding:28px;background:#fff;border-radius:14px;box-shadow:0 2px 12px rgba(0,0,0,0.10);">
            <h2 style="color:#0078d4;">Your Personality & Style Summary</h2>
            <p><strong>MBTI Type:</strong> ${mbti} <br><span style="color:#555;">${mbtiDesc}</span></p>
            <p><strong>Body Type:</strong> ${userInfo.bodyType}</p>
            <p><strong>Gender:</strong> ${userInfo.gender}</p>
            <p><strong>Age:</strong> ${userInfo.age}</p>
            <p><strong>Body Language:</strong> ${bodyLang}</p>
            <p><strong>Style Preference:</strong> ${stylePref}</p>
            <hr style="margin:18px 0;">
            <h3 style="color:#0078d4;">Prediction & Advice</h3>
            <p style="font-size:1.1em;">${prediction}</p>
            <p style="margin-top:24px;color:#888;">Thank you for completing the quiz!</p>
        </div>
    `;

    document.getElementById("questions").innerHTML = resultHTML;
    resultHTML.style.padding = "24px";
    resultHTML.style.background = "#22222";
}

renderQuestion();
