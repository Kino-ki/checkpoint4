/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake datad
// const { faker } = require("@faker-js/faker");

// Import database client
const { faker } = require("@faker-js/faker");
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Generating Seed Data

    // Optional: Truncate tables (remove existing data)

    // Add categories in database
    await database.query(
      "INSERT INTO category (category_name) VALUES ('book'),('toy'),('plush'),('high-tech'),('sport'),('food'),('clothes'),('other'),('game'),('video game'),('multimedia'),('kitchen'),('jewel')"
    );

    await database.query(
      "INSERT INTO manufacturer (manuf_name, country) VALUES ('Haribo', 'France'),('Chez Toto','France'),('Toys Inc.','United-Kingdom'),('Fleury & Bott','United-Kingdom'),('Matador','Spain'),('Bazar Avenue','France'), ('Multimedia Shop','Germany'),('Lego','Danemark'),('Sportland America','USA'), ('Santa specials', 'Pôle Nord') "
    );

    await database.query(
      "INSERT INTO product (product_name, quantity, price, category_id, manufacturer_id) VALUES ('Car-en-sac',50,2.5,6,1),('Tagada',48,2.2,6,1),('Les meilleures blagues de Toto',3,15,1,2),('Lutin baptiste',1,50,8,4),('Lutin précieux',1,98,8,4),('Harry Potter, La chambre des secrets',6,15,1,5),('Batte de baseball',8,38,5,10),('Faucon Millenium',2,388,2,9),('Petite Voiture de Flash MCQueen ',35,4.5,2,3),('Winnie the pooh 35cm',8,13,3,3),('Le Marsupilami 45cm',28,16,3,3),('Saucisse de Toulouse',3,6.5,6,6),('TV LCD 84cm',3,256,4,8),('Cafetière', 32,45,12,7),('MacBook Pro',3,1500,4,8),('Astérix le gaulois',4,8.5,1,5),('PayDay 2',8,7.8,10,8),('Babyfoot',2,156,5,3),('Appareil Photo Numérique',7,215,4,8),('MarioKart 8 Deluxe',8,45,10,8),('Ballon de football',78,8,5,10),('Chorizo',45,5.5,6,6),('Micro-onde',12,79,12,7),('King Ayoub',1,3500,2,9),('Les aventuriers du rail',5,45,9,2),('Histoire de Haribo',7,35,1,1),('The Rolling Stones - Hackney Diamonds',78,18.5,11,8),('La carte du maraudeur',1,500,8,5),('Chocogrenouille',234,3.5,6,5),('Nike Air Jordan 1',2,250,7,10)"
    );

    for (let i = 0; i < 5; i += 1) {
      queries.push(
        database.query(
          "INSERT INTO user( username, email, hashed_password, firstname, lastname  ) VALUES (?, ?, ?, ?, ?)",
          [
            faker.internet.displayName(),
            faker.internet.email(),
            faker.internet.password(),
            faker.person.firstName(),
            faker.person.lastName(),
          ]
        )
      );
    }

    for (let i = 0; i < 5; i += 1) {
      queries.push(
        database.query(
          `INSERT INTO cart (user_id, product_id) VALUES (? , ?)`,
          [
            faker.number.int({ min: 1, max: 4 }),
            faker.number.int({ min: 1, max: 10 }),
          ]
        )
      );
    }
    for (let i = 0; i < 5; i += 1) {
      queries.push(
        database.query(
          `INSERT INTO orders (user_id, product_id) VALUES (? , ?)`,
          [
            faker.number.int({ min: 1, max: 4 }),
            faker.number.int({ min: 1, max: 10 }),
          ]
        )
      );
    }
    /* ************************************************************************* */

    // Wait for all the insertion queries to complete
    await Promise.all(queries);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err, err.message);
  }
};

// Run the seed function
seed();
