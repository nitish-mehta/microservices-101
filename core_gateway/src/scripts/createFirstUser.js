/**
 * @fileOverview Script to create first admin account in the application.
 * create connection to database(All db params as constants at top of the file)
 * config in the file is user details of the admin
 * Insert into the user table in the database.
 */
const pg = require("pg");
const uuidv4 = require("uuid/v4");

// MAINTAIN DATABASE CONFIGURATIONS HERE
const CONFIG = {
  DB_USER: "postgres",
  DB_PASSWORD: "postgres",
  DB_HOST: "localhost",
  DB_NAME: "postgres"
};

// create details for admin user
const user_id = uuidv4();
const first_name = "Meetup";
const last_name = "Admin";
const email = "admin@example.com";
const phone = "999999999";
const auth_token = "Strongpass@123";
const is_admin = true; // specify admin
const is_active = true;
const role_code = "editor";

// create connection
const conString = `pg://${CONFIG.DB_USER}:${CONFIG.DB_PASSWORD}@${CONFIG.DB_HOST}:5432/${CONFIG.DB_NAME}`;
const client = new pg.Client(conString);
client.connect();

async function insert_query() {
  // insert record to user table
  await client.query(
    'INSERT INTO "user" ("user_id","first_name","last_name","role_code","email","phone","auth_token", "is_active", "is_admin", "created_at", "updated_at") values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
    [
      user_id,
      first_name,
      last_name,
      role_code,
      email,
      phone,
      auth_token,
      is_admin,
      is_active,
      new Date(),
      new Date()
    ]
  );
  client.end().then(() => console.log("client has disconnected"));
  process.exit();
}

insert_query();
