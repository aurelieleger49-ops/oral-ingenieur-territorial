// ----- Questions déroulantes (Q/R affichage réactif) -----
document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question');

    questions.forEach(q => {
        q.addEventListener('click', () => {
            const reponse = q.nextElementSibling;

            // Fermer les autres réponses
            document.querySelectorAll('.reponse').forEach(r => {
                if (r !== reponse) {
                    r.classList.remove('ouverte');
                }
            });

            // Basculer l’état de la réponse courante
            reponse.classList.toggle('ouverte');
        });
    });
});
