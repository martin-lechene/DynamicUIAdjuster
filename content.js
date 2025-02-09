// Fonction pour détecter les éléments communs sur un site
const detectSiteSelectors = () => {
  const selectors = {};

  // Recherche d'une sidebar (commune sur beaucoup de sites)
  const sidebar = document.querySelector('aside, .sidebar, #sidebar, .main-sidebar');
  if (sidebar) selectors.sidebar = sidebar;

  // Recherche de la section des commentaires (souvent marquée par des classes comme "comments" ou "comment-section")
  const comments = document.querySelector('.comments, .comment-section, #comments');
  if (comments) selectors.comments = comments;

  // Recherche de la barre de recherche
  const searchBar = document.querySelector('input[type="search"], #search-input, .search-bar input');
  if (searchBar) selectors.searchBar = searchBar;

  // Recherche d'un bouton d'abonnement
  const subscriptionButton = document.querySelector('.subscribe-button, #subscribe-button, .subscribe-btn');
  if (subscriptionButton) selectors.subscriptionButton = subscriptionButton;

  // Recherche du lecteur vidéo
  const videoElement = document.querySelector('video, .video-player');
  if (videoElement) selectors.videoElement = videoElement;

  // Recherche des vidéos recommandées ou liées
  const relatedVideos = document.querySelector('.related-videos, #related-videos, .ytd-watch-next-secondary-results-renderer');
  if (relatedVideos) selectors.relatedVideos = relatedVideos;

  // Recherche des notifications (ex. en forme de cloche)
  const notifications = document.querySelector('.notif-bell, .notification, #notif-bell');
  if (notifications) selectors.notifications = notifications;

  // Recherche des contenus recommandés
  const recommendedContent = document.querySelector('.recommended-content, .recommendations, #recommended');
  if (recommendedContent) selectors.recommendedContent = recommendedContent;

  // Recherche des bannières publicitaires
  const banners = document.querySelector('.ad-banner, .ad-container, .advertisement');
  if (banners) selectors.banners = banners;

  return selectors;
};

// Récupère l'URL actuelle du site
const currentSite = window.location.hostname;

// Détecte dynamiquement les sélecteurs du site actuel
const selectors = detectSiteSelectors();

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
  // Analyse des clics ou interactions sur les éléments détectés
  Object.keys(selectors).forEach(selectorKey => {
    const element = selectors[selectorKey];
    if (element) {
      element.addEventListener('click', () => incrementActionScore(selectorKey));
      element.addEventListener('mouseover', () => incrementActionScore(selectorKey));
    }
  });
};

// Fonction pour appliquer les modifications UI en fonction des scores
const adjustUIBasedOnBehavior = () => {
  // Règles génériques d'affichage à partir des scores
  const applyVisibility = (selector, action, threshold = 3, hide = false) => {
    const element = selector;
    if (element) {
      if (userActions[currentSite][action] > threshold) {
        element.style.display = hide ? 'none' : 'block';
      } else {
        element.style.display = hide ? 'block' : 'none';
      }
    }
  };

  // Applique les ajustements d'UI basés sur les actions de l'utilisateur
  Object.keys(selectors).forEach(selectorKey => {
    const element = selectors[selectorKey];
    if (element) {
      switch (selectorKey) {
        case 'sidebar':
          applyVisibility(element, 'sidebar', 5);
          break;
        case 'comments':
          applyVisibility(element, 'comments', 0, true);
          break;
        case 'searchBar':
          applyVisibility(element, 'search', 3);
          break;
        case 'subscriptionButton':
          const subscribeButton = element;
          subscribeButton.style.transform = userActions[currentSite].subscriptionButton === 0 ? 'scale(0.5)' : 'scale(1)';
          break;
        case 'videoElement':
          if (userActions[currentSite].videoFullScreen > 3 && !document.fullscreenElement) {
            element.requestFullscreen();
          }
          break;
        case 'relatedVideos':
          applyVisibility(element, 'relatedVideos', 3);
          break;
        case 'notifications':
          applyVisibility(element, 'notifications', 0, true);
          break;
        case 'recommendedContent':
          applyVisibility(element, 'recommendedContent', 0, true);
          break;
        case 'banners':
          applyVisibility(element, 'banners', 0, true);
          break;
        default:
          break;
      }
    }
  });
};

// Lancer l'analyse et l'ajustement de l'UI
analyzeUserBehavior();
adjustUIBasedOnBehavior();
