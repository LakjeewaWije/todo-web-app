// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
                host: "rosie.db.elephantsql.com",
                port: 5432,
                database: "wmvusoeg",
                user: "wmvusoeg",
                password: "DoK5BxZtmtF1YH2I9lMeh3BOyxkp9HUb",
            }
  }
};
