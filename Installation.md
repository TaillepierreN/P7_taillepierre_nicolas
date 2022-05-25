## Installation BACKEND 

Créer un fichier .env dans backend/config contenant:"

    PORT=3010
    MYSQLROOT=exemple
    MYSQLPASS=exemple
    DBPORT=3310
    TOKEN=exemple

en remplaçant "exemple" par votre choix

Faire un "npm install" dans le dossier "backend"

## Installation FRONTEND 

Faire un "npm install" dans le dossier "frontend2"

### Lancer le projet

Faire un "nodemon start" dans le dossier "backend"
Faire un "npm run serve" dans le dossier "frontend2"
Puis aller sur http://localhost:8080/ dans le navigateur

**Si il y a un soucis a la création de la base de donnée, si elle existe déjà ou si il y a eu des modifications,décommentez les lignes suivante dans le fichier backend/server.js permettant de détruire et recrée la base de donnée a 0**

    db.sequelize.sync({ force: true }).then(() => {
        console.log("Drop and re-sync db.");
    });

**et commentez les lignes suivantes dans le même fichier**

    db.sequelize.sync();

**Pensez à bien recommenter et décommenter ces deux bout de code une fois la base de donnée recrée**

#### PS

Le dossier "frontend" contient une version du site fonctionel crée avec Vue3 mais pas manque de compatibilité avec certains plugin et documentation le projet a été recrée avec Vue2 dans le dossier "frontend2" fonctionel et plus complet.