// Fonction pour activer le mode de sélection d'un élément
let selectedElement = null;

const activateSelectionMode = () => {
  // Ajouter un écouteur de clic sur toute la page pour la sélection d'éléments
  document.body.addEventListener('click', handleElementSelection);
  document.body.style.cursor = 'pointer';
  alert('Cliquez sur un élément pour le sélectionner.');
};

// Fonction de gestion de la sélection de l'élément
const handleElementSelection = (event) => {
  // Vérifier que l'élément cliqué n'est pas un élément déjà sélectionné
  if (selectedElement !== event.target) {
    if (selectedElement) {
      selectedElement.style.border = ''; // Retirer la surbrillance de l'ancien élément
    }
    selectedElement = event.target;
    selectedElement.style.border = '2px solid red'; // Surbrillance de l'élément sélectionné
  }
  event.stopPropagation();
  event.preventDefault();
  
  // Afficher le menu d'actions
  showActionMenu(event.clientX, event.clientY);
};

// Fonction pour afficher le menu d'actions
const showActionMenu = (x, y) => {
  const actionMenu = document.createElement('div');
  actionMenu.style.position = 'absolute';
  actionMenu.style.left = `${x}px`;
  actionMenu.style.top = `${y}px`;
  actionMenu.style.backgroundColor = '#fff';
  actionMenu.style.border = '1px solid #ccc';
  actionMenu.style.padding = '10px';
  actionMenu.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
  
  // Liste des actions disponibles
  const actions = ['hide', 'scale', 'rotate', 'color', 'fullscreen', 'opacity'];
  actions.forEach(action => {
    const actionButton = document.createElement('button');
    actionButton.textContent = `Appliquer: ${action}`;
    actionButton.onclick = () => previewAction(action);
    actionMenu.appendChild(actionButton);
  });

  // Ajouter une option pour sauvegarder l'action
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Sauvegarder l\'action';
  saveButton.onclick = saveAction;
  actionMenu.appendChild(saveButton);

  // Ajouter le menu d'action à la page
  document.body.appendChild(actionMenu);
};

// Fonction pour prévisualiser l'action sur l'élément sélectionné
const previewAction = (action) => {
  if (!selectedElement) return;

  switch (action) {
    case 'hide':
      selectedElement.style.display = 'none';
      break;
    case 'scale':
      selectedElement.style.transform = 'scale(1.5)';
      break;
    case 'rotate':
      selectedElement.style.transform = 'rotate(15deg)';
      break;
    case 'color':
      selectedElement.style.color = 'red';
      break;
    case 'fullscreen':
      if (!document.fullscreenElement) {
        selectedElement.requestFullscreen();
      }
      break;
    case 'opacity':
      selectedElement.style.opacity = 0.5;
      break;
    default:
      break;
  }
};

// Fonction pour sauvegarder l'action sélectionnée dans le fichier settings.json
const saveAction = async () => {
  const action = prompt('Entrez l\'action à appliquer (hide, scale, rotate, color, fullscreen, opacity):');
  if (!action || !['hide', 'scale', 'rotate', 'color', 'fullscreen', 'opacity'].includes(action)) {
    alert('Action invalide');
    return;
  }
  
  const siteConfig = await loadSettings();
  const currentSite = window.location.hostname;
  
  if (!siteConfig[currentSite]) {
    siteConfig[currentSite] = { selectors: {}, actions: {} };
  }

  const selectorKey = prompt('Entrez une clé pour cet élément (par exemple, "sidebar", "comments"):');
  
  // Ajouter l'action à l'élément sélectionné
  siteConfig[currentSite].actions[selectorKey] = {
    threshold: 0, // Initialiser le seuil par défaut
    action: action
  };

  // Sauvegarder dans settings.json (localStorage ici pour la démo, dans un cas réel utiliser une API de stockage Chrome)
  await saveSettings(siteConfig);
  alert('Action sauvegardée!');
  selectedElement.style.border = ''; // Enlever la surbrillance de l'élément
};

// Fonction pour charger les paramètres du fichier settings.json (ici stocké localement)
const loadSettings = async () => {
  const settings = localStorage.getItem('settings');
  return settings ? JSON.parse(settings) : {};
};

// Fonction pour sauvegarder les paramètres dans le fichier settings.json
const saveSettings = async (settings) => {
  localStorage.setItem('settings', JSON.stringify(settings));
};

// Démarrer le mode de sélection d'élément lorsqu'on clique sur un bouton ou une action
document.getElementById('start-selection').addEventListener('click', () => {
  activateSelectionMode();
});
