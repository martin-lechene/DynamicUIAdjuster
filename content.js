// Récupère l'URL actuelle du site
const currentSite = window.location.hostname;

// Vérifie si les données existent déjà dans le stockage local, sinon initialise
let userActions = JSON.parse(localStorage.getItem('userActions')) || {};

// Si le site n'existe pas dans les données, on l'ajoute
if (!userActions[currentSite]) {
  userActions[currentSite] = {
    sidebar: 0,
    comments: 0,
    search: 0,
    subscriptionButton: 0,
    // Ajoutez d'autres éléments ici à suivre
  };
}

// Fonction pour incrémenter le score d'une action spécifique
const incrementActionScore = (action) => {
  if (userActions[currentSite]) {
    userActions[currentSite][action] += 1;
    localStorage.setItem('userActions', JSON.stringify(userActions));
  }
};

// Fonction pour analyser le comportement de l'utilisateur sur la page
const analyzeUserBehavior = () => {
  // Exemple : Suivre les clics sur la sidebar
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.addEventListener('click', () => {
      incrementActionScore('sidebar');
    });
  }

  // Suivre si l'utilisateur regarde les commentaires (par exemple en faisant défiler la page)
  const commentsSection = document.querySelector('.comments-section');
  if (commentsSection) {
    commentsSection.addEventListener('mouseover', () => {
      incrementActionScore('comments');
    });
  }

  // Suivre l'utilisation de la barre de recherche
  const searchBar = document.querySelector('.search-bar');
  if (searchBar) {
    searchBar.addEventListener('focus', () => {
      incrementActionScore('search');
    });
  }

  // Suivre les interactions avec le bouton d'abonnement
  const subscribeButton = document.querySelector('.subscribe-button');
  if (subscribeButton) {
    subscribeButton.addEventListener('click', () => {
      incrementActionScore('subscriptionButton');
    });
  }

  // Ajoutez d'autres événements selon les éléments spécifiques à chaque site
};

// Fonction pour appliquer les modifications UI en fonction des scores
const adjustUIBasedOnBehavior = () => {
  // Si la sidebar est fréquemment utilisée, laissez-la ouverte
  if (userActions[currentSite].sidebar > 5) {  // seuil arbitraire pour la démonstration
    document.querySelector('.sidebar').style.display = 'block';
  }

  // Si les commentaires ne sont jamais utilisés, cachez la section
  if (userActions[currentSite].comments === 0) {
    document.querySelector('.comments-section').style.display = 'none';
  }

  // Si la barre de recherche est fréquemment utilisée, affichez-la
  if (userActions[currentSite].search > 3) {  // seuil arbitraire
    document.querySelector('.search-bar').style.display = 'block';
  }

  // Si l'utilisateur clique rarement sur le bouton d'abonnement, réduisez sa taille
  if (userActions[currentSite].subscriptionButton === 0) {
    document.querySelector('.subscribe-button').style.transform = 'scale(0.5)';
  }

  // Ajoutez d'autres modifications UI basées sur les habitudes collectées
};

// Lancer l'analyse et l'ajustement de l'UI
analyzeUserBehavior();
adjustUIBasedOnBehavior();
