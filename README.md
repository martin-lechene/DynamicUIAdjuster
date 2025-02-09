# Chrome Extension : Dynamic Site Customizer

Cette extension Chrome vous permet de personnaliser le comportement et l'apparence des sites web en fonction de vos habitudes de navigation. Elle analyse votre interaction avec les éléments de la page (clics, visites, durée d'affichage) et ajuste dynamiquement l'affichage en fonction de vos préférences.

## Fonctionnalités

- **Sélection dynamique d'éléments** : Sélectionnez facilement des éléments de la page que vous souhaitez personnaliser.
- **Actions configurables** : Cacher, réduire, redimensionner ou mettre en plein écran des éléments en fonction de vos habitudes.
- **Prévisualisation des actions** : Appliquez temporairement les actions sur les éléments sélectionnés pour les tester avant de les enregistrer.
- **Sauvegarde automatique dans `settings.json`** : Une fois que vous êtes satisfait d'une action, vous pouvez la sauvegarder et l'appliquer automatiquement à chaque visite du site.
- **Paramétrage personnalisé** : Aucune configuration manuelle nécessaire. L'extension apprend automatiquement de votre navigation.

## Installation

1. Clonez ou téléchargez ce dépôt.
2. Allez dans `chrome://extensions/` dans votre navigateur Chrome.
3. Activez le mode développeur en haut à droite.
4. Cliquez sur "Charger l'extension décompressée" et sélectionnez le dossier contenant l'extension.
5. L'extension est maintenant prête à l'emploi.

## Utilisation

### Sélectionner un élément

1. Cliquez sur le bouton "Activer le mode de sélection" dans l'extension pour entrer en mode de sélection.
2. Cliquez sur n'importe quel élément de la page pour le sélectionner. L'élément sera mis en surbrillance.
3. Un menu contextuel apparaîtra pour vous permettre de choisir l'action que vous souhaitez appliquer à l'élément sélectionné.
4. Appliquez une action et prévisualisez les changements.
5. Si l'action vous convient, vous pouvez la sauvegarder pour une application future.

### Actions disponibles

- **hide** : Cache l'élément.
- **scale** : Agrandit l'élément.
- **rotate** : Applique une rotation à l'élément.
- **color** : Change la couleur de l'élément.
- **fullscreen** : Met l'élément en plein écran (si applicable).
- **opacity** : Rend l'élément partiellement transparent.

### Fichier `settings.json`

Le fichier `settings.json` contient la configuration des actions à appliquer pour chaque site. Il est sauvegardé localement et peut être édité directement. Exemple de configuration :

```json
{
  "youtube.com": {
    "selectors": {
      "sidebar": "#related",
      "comments": "#comments",
      "subscription_button": "#subscribe-button",
      "video_player": "#movie_player"
    },
    "actions": {
      "sidebar": {
        "threshold": 0.8,
        "action": "hide"
      },
      "comments": {
        "threshold": 0,
        "action": "hide"
      },
      "subscription_button": {
        "threshold": 0.5,
        "action": "reduce"
      },
      "video_player": {
        "threshold": 1,
        "action": "fullscreen"
      }
    }
  }
}
