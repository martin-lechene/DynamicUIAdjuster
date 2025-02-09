// Charger le fichier settings.json ou l'utiliser via chrome.storage
const loadSettings = async () => {
  try {
    const response = await fetch(chrome.runtime.getURL('settings.json'));
    return await response.json();
  } catch (error) {
    console.error('Error loading settings:', error);
    return {}; // Retourner un objet vide si le fichier échoue à se charger
  }
};

// Vérifie l'URL du site actuel
const currentSite = window.location.hostname;

// Vérifie si l'objet settings.json contient les configurations pour ce site
const applySiteSettings = (settings) => {
  const siteConfig = settings[currentSite];
  if (!siteConfig) return;

  const { selectors, actions } = siteConfig;

  // Si les sélecteurs existent pour ce site, on les récupère
  const userActions = JSON.parse(localStorage.getItem('userActions')) || {};
  if (!userActions[currentSite]) {
    userActions[currentSite] = {};
    Object.keys(selectors).forEach(selector => {
      userActions[currentSite][selector] = 0; // Initialiser les actions
    });
    localStorage.setItem('userActions', JSON.stringify(userActions));
  }

  // Fonction pour incrémenter le score d'une action spécifique
  const incrementActionScore = (action) => {
    if (userActions[currentSite]) {
      userActions[currentSite][action] += 1;
      localStorage.setItem('userActions', JSON.stringify(userActions));
    }
  };

  // Fonction pour appliquer l'action définie dans le fichier settings.json
  const applyAction = (selectorKey, element) => {
    const actionConfig = actions[selectorKey];
    const score = userActions[currentSite][selectorKey] || 0;
    
    // Action à appliquer en fonction du score et du seuil
    if (score >= actionConfig.threshold) {
      switch (actionConfig.action) {
        case 'display':
          element.style.display = 'block';
          break;
        case 'hide':
          element.style.display = 'none';
          break;
        case 'scale':
          element.style.transform = 'scale(1.5)';
          break;
        case 'fullscreen':
          if (!document.fullscreenElement) {
            element.requestFullscreen();
          }
          break;
        default:
          break;
      }
    }
  };

  // Analyser le comportement utilisateur et appliquer les actions
  Object.keys(selectors).forEach(selectorKey => {
    const element = document.querySelector(selectors[selectorKey]);
    if (element) {
      // Suivi des clics et interactions
      element.addEventListener('click', () => incrementActionScore(selectorKey));
      element.addEventListener('mouseover', () => incrementActionScore(selectorKey));

      // Appliquer les actions
      applyAction(selectorKey, element);
    }
  });
};

// Exécuter l'application des paramètres dès le chargement du script
loadSettings().then(settings => {
  applySiteSettings(settings);
});
