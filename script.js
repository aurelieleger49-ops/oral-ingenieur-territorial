// ----- Quiz QCM -----
const questions = [
    {
        question: "Quel principe garantit la capacité d’adaptation d’un service public ?",
        answers: ["Continuité", "Mutabilité", "Neutralité", "Égalité"],
        correct: 1
    },
    {
        question: "La protection des données dans le SI public passe par le respect de la _____ .",
        answers: ["CNIL", "RGPD", "ISO27001", "COPIL"],
        correct: 1
    },
    {
        question: "Remplis la phrase : La gestion de projet dans le SI doit respecter le cycle de vie : _____, conception, réalisation, exploitation.",
        answers: ["Expression du besoin", "Recette", "Formation", "Contrôle"],
        correct: 0
    },
    {
        question: "Comment appelle-t-on la capacité du SI à fonctionner en mode dégradé lors d’une panne ?",
        answers: ["Résilience", "Sécurité", "Scalabilité", "Disponibilité"],
        correct: 0
    },
    {
        question: "Un SIG dans une collectivité a pour but principal de :",
        answers: [
            "Protéger les données personnelles",
            "Faciliter la prise de décision grâce à l'analyse spatiale",
            "Calculer la paie des agents",
            "Assurer la cybersécurité"
        ],
        correct: 1
    }
];

let current = 0, score = 0;
function showQuestion() {
    document.getElementById('question').textContent = questions[current].question;
    document.getElementById('answers').innerHTML = '';
    questions[current].answers.forEach((ans, i) => {
        const btn = document.createElement('button');
        btn.textContent = ans;
        btn.onclick = () => {
            if (i === questions[current].correct) score++;
            Array.from(document.querySelectorAll('#answers button')).forEach(b=>b.disabled=true);
            document.getElementById('score').textContent = `Score : ${score}/${questions.length}`;
            document.getElementById('next').disabled = false;
        };
        document.getElementById('answers').appendChild(btn);
    });
    document.getElementById('next').disabled = true;
}
document.getElementById('next').onclick = () => {
    current++;
    if (current < questions.length) {
        showQuestion();
    } else {
        document.getElementById('question').textContent = "Quiz terminé !";
        document.getElementById('answers').innerHTML = '';
        document.getElementById('next').style.display = 'none';
    }
};
showQuestion();

// ----- Cloze (Questions à trous) -----
const clozeSolutions = {
    q1: ["mutabilité"],
    q2: ["rgpd", "loi rgpd"],
    q3: ["sécurité"],
    q4: ["continuité"]
};
document.getElementById("cloze-form").onsubmit = function(evt) {
    evt.preventDefault();
    let form = evt.target;
    let rep = [
        form.q1.value.trim().toLowerCase(),
        form.q2.value.trim().toLowerCase(),
        form.q3.value.trim().toLowerCase(),
        form.q4.value.trim().toLowerCase()
    ];
    let ok = 0;
    if(clozeSolutions.q1.includes(rep[0])) ok++;
    if(clozeSolutions.q2.includes(rep[1])) ok++;
    if(clozeSolutions.q3.includes(rep[2])) ok++;
    if(clozeSolutions.q4.includes(rep[3])) ok++;

    document.getElementById("cloze-result").textContent =
        `Résultat : ${ok} / 4 bonnes réponses`;
};
