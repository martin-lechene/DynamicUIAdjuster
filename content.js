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
    videoFullScreen: 0,
    relatedVideos: 0,
    notifications: 0,
    recommendedContent: 0,
    banners: 0,
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

  // Suivre si l'utilisateur regarde les commentaires
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

  // Suivre les clics sur le bouton d'abonnement
  const subscribeButton = document.querySelector('.subscribe-button');
  if (subscribeButton) {
    subscribeButton.addEventListener('click', () => {
      incrementActionScore('subscriptionButton');
    });
  }

  // Suivre l'activation du grand écran pour la vidéo
  const videoElement = document.querySelector('video');
  if (videoElement) {
    videoElement.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement) {
        incrementActionScore('videoFullScreen');
      }
    });
  }

  // Suivre les vidéos liées (sidebar des vidéos recommandées)
  const relatedVideos = document.querySelector('.related-videos');
  if (relatedVideos) {
    relatedVideos.addEventListener('mouseover', () => {
      incrementActionScore('relatedVideos');
    });
  }

  // Suivre les notifications (ex. sur YouTube, Facebook)
  const notifications = document.querySelector('.notifications');
  if (notifications) {
    notifications.addEventListener('click', () => {
      incrementActionScore('notifications');
    });
  }

  // Suivre le contenu recommandé
  const recommendedContent = document.querySelector('.recommended-content');
  if (recommendedContent) {
    recommendedContent.addEventListener('mouseover', () => {
      incrementActionScore('recommendedContent');
    });
  }

  // Suivre les bannières publicitaires
  const banners = document.querySelector('.ads');
  if (banners) {
    banners.addEventListener('mouseover', () => {
      incrementActionScore('banners');
    });
  }
};

// Fonction pour appliquer les modifications UI en fonction des scores
const adjustUIBasedOnBehavior = () => {
  // Si la sidebar est fréquemment utilisée, laissez-la ouverte
  if (userActions[currentSite].sidebar > 5) {  // seuil arbitraire
    document.querySelector('.sidebar').style.display = 'block';
  } else {
    document.querySelector('.sidebar').style.display = 'none';
  }

  // Si les commentaires ne sont jamais utilisés, cachez la section
  if (userActions[currentSite].comments === 0) {
    document.querySelector('.comments-section').style.display = 'none';
  } else {
    document.querySelector('.comments-section').style.display = 'block';
  }

  // Si la barre de recherche est fréquemment utilisée, affichez-la
  if (userActions[currentSite].search > 3) {  // seuil arbitraire
    document.querySelector('.search-bar').style.display = 'block';
  }

  // Si l'utilisateur clique rarement sur le bouton d'abonnement, réduisez sa taille
  if (userActions[currentSite].subscriptionButton === 0) {
    document.querySelector('.subscribe-button').style.transform = 'scale(0.5)';
  } else {
    document.querySelector('.subscribe-button').style.transform = 'scale(1)';
  }

  // Si la vidéo est souvent en grand écran, forcez le mode plein écran
  if (userActions[currentSite].videoFullScreen > 3) {  // seuil arbitraire
    const videoElement = document.querySelector('video');
    if (videoElement && !document.fullscreenElement) {
      videoElement.requestFullscreen();
    }
  }

  // Si les vidéos liées sont fréquemment consultées, laissez la sidebar des vidéos liées ouverte
  if (userActions[currentSite].relatedVideos > 3) {  // seuil arbitraire
    document.querySelector('.related-videos').style.display = 'block';
  } else {
    document.querySelector('.related-videos').style.display = 'none';
  }

  // Si les notifications ne sont jamais cliquées, cachez-les
  if (userActions[currentSite].notifications === 0) {
    document.querySelector('.notifications').style.display = 'none';
  } else {
    document.querySelector('.notifications').style.display = 'block';
  }

  // Si le contenu recommandé est rarement consulté, cachez-le
  if (userActions[currentSite].recommendedContent === 0) {
    document.querySelector('.recommended-content').style.display = 'none';
  } else {
    document.querySelector('.recommended-content').style.display = 'block';
  }

  // Si les bannières publicitaires sont rarement consultées, réduisez leur taille ou cachez-les
  if (userActions[currentSite].banners === 0) {
    document.querySelector('.ads').style.display = 'none';
  } else {
    document.querySelector('.ads').style.transform = 'scale(0.5)';
  }

  // Autres ajustements spécifiques à vos besoins peuvent être ajoutés ici
};

// Lancer l'analyse et l'ajustement de l'UI
analyzeUserBehavior();
adjustUIBasedOnBehavior();
