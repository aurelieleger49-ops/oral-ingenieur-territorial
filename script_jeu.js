let questions = [];
let currentIndex = -1;

const questionDiv = document.getElementById('question');
const answerDiv = document.getElementById('answer');
const showAnswerBtn = document.getElementById('show-answer-btn');
const nextQuestionBtn = document.getElementById('next-question-btn');
const gameDiv = document.getElementById('game');

showAnswerBtn.addEventListener('click', () => {
    answerDiv.style.display = 'block';
});
nextQuestionBtn.addEventListener('click', showRandomQuestion);

function formatQuestion(text) {
    const escapedText = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return escapedText.replace(/\[(.+?)\]/g, '<span class="bracketed">[$1]</span>');
}

function initialiserJeu(urlExcel) {
    fetch(urlExcel)
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, {type: 'array'});
            questions = [];

            workbook.SheetNames.forEach(sheetName => {
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet, {defval: ''});
                json.forEach(row => {
                    if (row['Questions'] && row['Réponses']) {
                        questions.push({
                            theme: sheetName,
                            question: row['Questions'].toString(),
                            answer: row['Réponses'].toString()
                        });
                    }
                });
            });

            if (questions.length === 0) {
                questionDiv.textContent = "Aucune question trouvée dans le fichier.";
                return;
            }

            gameDiv.style.display = 'block';
            showRandomQuestion();
        })
        .catch(err => {
            questionDiv.textContent = "Erreur lors du chargement du fichier : " + err;
        });
}

function showRandomQuestion() {
    answerDiv.style.display = 'none';
    if (questions.length === 0) {
        questionDiv.textContent = "Aucune question disponible.";
        return;
    }
    currentIndex = Math.floor(Math.random() * questions.length);
    const q = questions[currentIndex];
    questionDiv.innerHTML = `<span class="question-text"><span class="bracketed">[${q.theme}]</span> ${formatQuestion(q.question || 'Question non disponible')}</span>`;

    answerDiv.innerHTML = (q.answer || 'Réponse non disponible').replace(/\n/g, '<br>');
}

// Exemple d'appel de la fonction
initialiserJeu('https://aurelieleger49-ops.github.io/oral-ingenieur-territorial/QR.xlsx');
