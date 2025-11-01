// On attend que le DOM soit chargé avant d'appeler la fonction principale
document.addEventListener('DOMContentLoaded', () => {
  const urlFichierExcel = 'https://aurelieleger49-ops.github.io/oral-ingenieur-territorial/QR.xlsx';
  afficherQuestionsReponsesDepuisExcel(urlFichierExcel);
});

// Fonction pour charger et afficher les données Excel avec blocs Q/R par thème (div.bloc)
function afficherQuestionsReponsesDepuisExcel(url) {
  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error('Erreur chargement fichier: ' + res.status);
      return res.arrayBuffer();
    })
    .then(data => {
      const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
      const container = document.getElementById('contenu');
      container.innerHTML = '';

      workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        // Création d'un bloc pour le thème
        const blocTheme = document.createElement('div');
        blocTheme.className = 'bloc';

        // Titre h2 avec nom du thème et nombre de questions
        const h2 = document.createElement('h2');
        h2.textContent = `${sheetName} (${jsonData.length} questions)`;
        blocTheme.appendChild(h2);

        // Ajout des questions/réponses dans ce bloc thème
        jsonData.forEach(row => {
          const bloc = document.createElement('div');
          bloc.className = 'bloc';

          const question = document.createElement('div');
          question.className = 'question';
          question.textContent = row['Questions'] || '';

          const reponse = document.createElement('div');
          reponse.className = 'reponse';

          // Gestion des retours à la ligne dans les réponses, création de <ul><li>
          const lignes = (row['Réponses'] || '').split('\n').map(l => l.trim()).filter(l => l.length > 0);
          if (lignes.length > 1) {
            const ul = document.createElement('ul');
            lignes.forEach(ligne => {
              const li = document.createElement('li');
              li.textContent = ligne;
              ul.appendChild(li);
            });
            reponse.appendChild(ul);
          } else {
            reponse.textContent = lignes[0] || '';
          }

          bloc.appendChild(question);
          bloc.appendChild(reponse);
          blocTheme.appendChild(bloc);
        });

        container.appendChild(blocTheme);
      });
    })
    .catch(e => {
      const container = document.getElementById('contenu');
      container.textContent = e.message;
    });
}

// Délégation de clic sur les questions pour faire apparaître/masquer les réponses
document.getElementById('contenu').addEventListener('click', e => {
  if (e.target.classList.contains('question')) {
    const reponse = e.target.nextElementSibling;
    if (!reponse) return;

    // Cacher les réponses ouvertes sauf celle cliquée
    document.querySelectorAll('.reponse.ouverte').forEach(r => {
      if (r !== reponse) r.classList.remove('ouverte');
    });

    // Basculer la classe 'ouverte' pour afficher/cacher la réponse
    reponse.classList.toggle('ouverte');
  }
});
