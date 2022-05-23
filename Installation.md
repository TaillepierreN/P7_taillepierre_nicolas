## Installation BACKEND 

Faire un "npm install" dans le dossier "backend"

## Installation FRONTEND 

Faire un "npm install" dans le dossier "frontend2"

### Lancer le projet

**Vérifier que les lignes de codes suivantes soient bien décommentée dans le fichier backend/server.js lors de la première utilisation**

    db.sequelize.sync({ force: true }).then(() => {
        console.log("Drop and re-sync db.");
    });`

**Vérifier que la ligne de code suivante soit bien commentée dans le fichier backend/server.js lors de la première utilisation**

    db.sequelize.sync();


Faire un "nodemon start" dans le dossier "backend"
Faire un "npm run serve" dans le dossier "frontend2"
Puis aller sur http://localhost:8080/ dans le navigateur

**Après la première initialisation de la base de donnée,commentez les lignes de codes suivantes dans le fichier backend/server.js**

    db.sequelize.sync({ force: true }).then(() => {
        console.log("Drop and re-sync db.");
    });`

**Après la première initialisation de la base de donnée,décommentez la ligne de code suivante dans le fichier backend/server.js**

    db.sequelize.sync();


#### PS

Le dossier "frontend" contient une version du site fonctionel crée avec Vue3 mais pas manque de compatibilité avec certains plugin et documentation le projet a été recrée avec Vue2 dans le dossier "frontend2" fonctionel et plus complet.