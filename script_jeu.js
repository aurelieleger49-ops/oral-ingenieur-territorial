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

// Charger le fichier QR.xlsx via fetch
fetch('https://aurelieleger49-ops.github.io/oral-ingenieur-territorial/QR.xlsx')
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

function showRandomQuestion() {
  answerDiv.style.display = 'none';
  if (questions.length === 0) {
    questionDiv.textContent = "Aucune question disponible.";
    return;
  }
  currentIndex = Math.floor(Math.random() * questions.length);
  const q = questions[currentIndex];
  questionDiv.textContent = `[${q.theme}] ${q.question || 'Question non disponible'}`;
  answerDiv.innerHTML = (q.answer || 'Réponse non disponible').replace(/\n/g, '<br>');
}

