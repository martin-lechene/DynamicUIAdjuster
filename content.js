// Charger le fichier settings.json
const loadSettings = async () => {
  try {
    const response = await fetch(chrome.runtime.getURL('settings.json'));
    return await response.json();
  } catch (error) {
    console.error('Error loading settings:', error);
    return {}; // Retourner un objet vide en cas d'erreur
  }
};

// Sauvegarder les nouvelles configurations dans le settings.json
const saveSettings = async (settings) => {
  const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  chrome.downloads.download({ url, filename: 'settings.json' });
};

// Calcule le temps de visibilité d'un élément en fonction du temps où l'élément est visible dans la fenêtre
let visibilityTime = {};
const trackVisibility = (element, selector) => {
  const elementRect = element.getBoundingClientRect();
  const isVisible = (elementRect.top >= 0 && elementRect.bottom <= window.innerHeight);
  
  if (isVisible) {
    if (!visibilityTime[selector]) {
      visibilityTime[selector] = 0;
    }
    visibilityTime[selector] += 1; // Incrémente le temps visible
  }
};

// Fonction pour initialiser la prévisualisation de l'action sur un élément
const previewAction = (action, element) => {
  switch (action) {
    case 'scale':
      element.style.transform = 'scale(1.5)';
      break;
    case 'hide':
      element.style.display = 'none';
      break;
    case 'fullscreen':
      element.requestFullscreen();
      break;
    case 'color':
      element.style.color = 'red';
      break;
    case 'opacity':
      element.style.opacity = '0.5';
      break;
    default:
      break;
  }
};

// Écouter les clics pour sélectionner un élément et définir son action
let selectedElement = null;
document.addEventListener('click', (e) => {
  e.preventDefault();
  if (selectedElement) {
    // L'élément a été sélectionné, maintenant on peut lui appliquer une action
    const action = prompt("Entrez l'action (scale, hide, fullscreen, color, opacity) pour l'élément sélectionné :");
    const selector = selectedElement.getAttribute('id') || selectedElement.getAttribute('class');
    const actionConfig = {
      [selector]: {
        action: action,
        threshold: 5 // Utiliser un seuil arbitraire, mais cela peut être ajusté
      }
    };

    loadSettings().then(settings => {
      const siteConfig = settings[currentSite] || {};
      siteConfig.selectors = siteConfig.selectors || {};
      siteConfig.actions = siteConfig.actions || {};
      siteConfig.actions = { ...siteConfig.actions, ...actionConfig };
      settings[currentSite] = siteConfig;
      saveSettings(settings); // Sauvegarder les nouvelles configurations
    });

    selectedElement.style.border = ''; // Reset du bord après sélection
    selectedElement = null;
  } else {
    selectedElement = e.target;
    selectedElement.style.border = '2px solid red'; // Met en évidence l'élément sélectionné
    previewAction('scale', selectedElement); // Affiche un aperçu de l'action "scale" sur l'élément
  }
});

// Analyser les comportements utilisateur et appliquer les actions
const applySiteSettings = (settings) => {
  const siteConfig = settings[currentSite];
  if (!siteConfig) return;

  const { selectors, actions } = siteConfig;
  Object.keys(selectors).forEach(selectorKey => {
    const element = document.querySelector(selectors[selectorKey]);
    if (element) {
      // Suivi du temps de visibilité de l'élément
      trackVisibility(element, selectorKey);
      // Appliquer les actions si le seuil est atteint
      if (visibilityTime[selectorKey] >= actions[selectorKey].threshold) {
        applyAction(selectorKey, element);
      }
    }
  });
};

// Appliquer l'action sur l'élément sélectionné
const applyAction = (selectorKey, element) => {
  const actionConfig = actions[selectorKey];
  switch (actionConfig.action) {
    case 'scale':
      element.style.transform = 'scale(1.5)';
      break;
    case 'hide':
      element.style.display = 'none';
      break;
    case 'fullscreen':
      element.requestFullscreen();
      break;
    case 'color':
      element.style.color = 'red';
      break;
    case 'opacity':
      element.style.opacity = '0.5';
      break;
    default:
      break;
  }
};

// Charger et appliquer les paramètres du site dès que possible
loadSettings().then(settings => {
  applySiteSettings(settings);
});
