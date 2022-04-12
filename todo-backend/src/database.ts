import { Model } from "objection";
import Knex from "knex";

export namespace db {

    export class BaseModel extends Model {
        static get concurrency() {
            return 4;
        }
    }

    export const initDb = function () {
        // Initialize knex.
        const knex = Knex({
            client: 'pg',
            connection: {
                host: "rosie.db.elephantsql.com",
                port: 5432,
                database: "wmvusoeg",
                user: "wmvusoeg",
                password: "DoK5BxZtmtF1YH2I9lMeh3BOyxkp9HUb",
            }
        });

        // Give the knex instance to objection.
        BaseModel.knex(knex);
    };
}