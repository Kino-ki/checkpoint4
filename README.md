# Project pour aider le Père Noël ( avec Express.js et React )

## Objectif

L'objectif de cet exercice est de créer une application de Liste pour le Père Noël en utilisant Express.js pour le côté serveur et React pour le côté client. L'exercice vise à pratiquer les concepts de routes, controllers et interactions avec une base de données MySQL.

Le Père Noël souhaite créer un site référençant des produits qu’il distribue pour que les enfants puissent constituer leur liste de Noël.
Ces produits seront définis par un nom, une catégorie, une quantité , un prix unitaire ainsi qu’un fabricant. Le Père Noël souhaite pouvoir afficher la liste des produits (avec leur détails) mais aussi celle des fabricants avec leurs produits respectifs et leur pays de production.
Il veut qu’on puisse filtrer les produits par leurs catégories et les trier par leur quantité.
On aura l’occasion d’ajouter des produits dans notre liste au Père Noël et potentiellement de lui envoyer!

## Tâches à accomplir

### Partie Serveur (Express.js et MySQL)

1. Créer la structure de la base de donnée via la méthode MERISE (MCD > MLD > MPD) gràce aux informations données précédement !

2. Présenter cette structure au Client (Pierre) pour validation.

3. Installez les dépendances nécessaires :

   ```js
   npm install
   ```

4. Configurez une base de données MySQL:
   Créez la base de données `santalist_db` et les tables nécessaires (issu de votre travail précédent) dans le fichier `schema.sql`.
   Puis lancez le script.

   ```js
   cd backend
   npm run db:migrate
   ```

   PS:on oublie pas de créer son fichier `.env` dans le dossier backend avec les infos nécessaires !

5. Connectez-vous à la base de données MySQL depuis votre application Express.js.

6. Créez les routes suivantes dans votre application Express.js (évidement il va falloir faire ça à la façon Ayoub: créez un dossier routers et des fichier pour gérer les routes pour chaque tables et gérer ces differentes routes dans le fichier router.js de base):

   - `GET /api/products` : Récupérer tous les produits de la base de données.
   - `POST /api/products` : Ajouter un nouveau produit à la base de données.
   - `GET /api/products/:id` : Récupérer un produit unique de la base de données.
   - `PUT /api/products/:id` : Mettre à jour un produit éxistant dans la base de données (permet de mettre à jour la quantité d'un produit suite à l'ajout dans une liste de noël ou de changer son état isWish).
   - `DELETE /api/products/:id` : Supprimer un produit de la base de données.

   - `GET /api/categories` : Récupérer toutes les catégories de la base de données.
   - `POST /api/categories` : Ajouter une nouvelle catégorie à la base de données.
   - `GET /api/categories/:id` : Récupérer une catégorie unique de la base de donnée.
   - `PUT /api/categories/:id` : Mettre à jour une catégorie éxistante dans la base de donnée.
   - `DELETE /api/categories/:id` : Supprimer une catégorie de la base de donnée (et donc les produits associés ^^).

   - `GET /api/manufacturers` : Récupérer tous les fabricants de la base de données.
   - `POST /api/manufacturers` : Ajouter un fabricant à la base de données.
   - `GET /api/manufacturers/:id` : Récupérer un fabricant unique de la base de donnée.
   - `PUT /api/manufacturers/:id` : Mettre à jour un fabricant (changer son lieu de production par exemple)
   - `DELETE /api/manufacturers/:id` : Supprimer un fabricant de la base de données (une fois de plus supprimer les produits de ce dernier par cascade).

7. Créez les fichiers `productControllers`, `categoryControllers` et `manufacturerControllers` qui contiendront la logique de vos routes en utilisant la nomenclature `BREAD` (cf. le fichier `itemControllers.js`).

8. Créez les fichiers `ProductManager`, `CategoryManager` et `ManufacturerManager` qui contiendront les fonctions permettant d'interagir avec la base de données (logique `CRUD`). Importez ce fichier dans vos controllers pour utiliser les fonctions.

9. Importez et ajouter vos différents fichier `%Manager.js` dans le fichier `tables.js`.

10. Remplissez vos tables grâce au fichier `seed.js` (préparé par votre client) en lançant la commande :

    ```js
    npm run db:seed
    ```

11. Testez vos différentes routes avec Postman : Ajouter/Modifier/Supprimer/Obtener des produits/catégories et fabricant
    Puis relancez la commande précédent pour avoir une base de donnée propre.

### Partie Client (React)

1. Créer 3 nouvelles routes (des enfants de App) : `/products`, `/manufacturers`, `/santalist` dans votre application React.

2. Créer 4 nouvelles pages:

   - `HomePage` : qui présentera le site brièvement.
   - `ProductsPage`.
   - `ManufacturersPage`.
   - `SantaListPage`.

3. Créez 4 composants:

   - `navbar` qui affichera un logo (parmis ceux présent dans le dossier `/frontend/src/assets`), le nom du site `Dans la hotte du Père Noël` ainsi que 3 NavLinks vers les pages précédement créées. Importez-le dans `App.js` avec le composant `Outlet`.
   - `SingleProduct` qui affichera toutes les informations d'un produit.
   - `Productlist` qui affichera la liste des produits (map + `Product`).
   - `Manufacturerlist` qui affichera la liste des fabricants avec leurs produits asociés.
   - `Santalist` qui affichera la liste des produits choisis.

4. Utilisez l'API Express.js pour récupérer la liste des produits et les afficher dans votre composant `Productlist` et faites de même pour la liste des fabricants dans le composant `ManufacturerList`.

5. Ajoutez la possibilité de créer un nouveau produit (qu'on souhaiterait ajouter à notre wishlist mais qui ne serait pas déjà présent dans la liste) en utilisant l'API Express.js dans un nouveau composant `CreateProduct`.
   Il faudra ajouter une contrôle de validation sur ce formulaire (côté frontend).
   Pour ce nouveau produit on ne renseignera que le nom, la quantité en stock et le prix unitaire. L'utilisateur sélectionnera la catégorie et le fabricant via un input de type select.

6. Ajoutez des fonctionnalités pour ajouter un produit à la Santalist (modifié le statut is_fav du produit et réduire le stock de ce produit en conséquence) ou supprimer un produit de la Santalist.

7. Ajoutez une condition pour n'afficher que les produits avec un stock supérieur à 0 dans la `ProductsPage`.

8. Ajoutez des filtres (côté frontend seulement) à la `ProductsPage`

   - filtrer par catégorie.
   - filtrer par fabricant.
   - rechercher un produit par son nom.
   - filtrer par tranche de prix.

   ===> le client souhaiterait qu'ils soient cumulables évidemment <===

### Extra

- Ajoutez une formulaire d'envoi au Père Noël de la Santalist !
- Gérer les filtres grâce aux `req.query` via le backend.

## Bonus

- Ajoutez des styles CSS pour améliorer l'apparence de votre application de Noël en respectant les 4 couleurs données par le client :

  - da2c38
  - 226f54
  - 43291f
  - f4f0bb

- Un vote se fera au retour des vacances pour le plus BEAU site (fonctionnel aussi ^^)! (peut-être un badge à la clé)

## Ressources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [MySQL Documentation](https://dev.mysql.com/doc/)

Cet exercice vous permettra de vous familiariser avec la création d'une application complète utilisant Express.js et React, en mettant l'accent sur les interactions avec une base de données MySQL. Bonne chance et joyeux noël !!
