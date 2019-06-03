const path = require("path");
const glob = require("glob");

const credential = require('../config/firebase');
const firebaseSdk = require('firebase-admin');
const firebase = firebaseSdk.initializeApp({
    credential: firebaseSdk.credential.cert(credential),
});

module.exports = (migration_name) => ({
    up: async (queryInterface) => {
        try {
            await migrate(queryInterface, migration_name, "up");
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    down: async (queryInterface) => {
        try {
            await migrate(queryInterface, migration_name, "down");
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
});

async function migrate(queryInterface, migration_name, up) {
    return queryInterface.sequelize.transaction(async (transaction) => {
        const migrations = buildMigrations(
            path.basename(migration_name, ".js"),
            up
        ).sort((a, b) =>
            a.priority > b.priority ? 1 : b.priority > a.priority ? -1 : 0
        );

        for (const migration of migrations) {
            if (migration.action) {
                await migration.action(queryInterface, transaction, {
                    firebase,
                });
                console.log(`Migrated '${migration.migration}' of '${migration.name}' successfully.`);
            } else {
                throw `Missing migration method '${up}' at '${migration.migration}' of '${migration.name}'`;
            }
        }
    });
}

function buildMigrations(migration_name, target) {
    const migrations = [];
    const models = glob.sync("../../models/**/*.js", { cwd: __dirname });
    for (const model_path of models) {
        const model_name = path.basename(model_path, ".js");
        const model = require(model_path);

        if (!model.migrations) {
            console.log(`Skipping '${model_name}' for migration '${migration_name}'.`);
            continue;
        }

        const migrate_options = model.migrations[migration_name];
        if (!migrate_options) {
            console.log(`Skipping '${model_name}' for migration '${migration_name}'.`);
            continue;
        }

        migrations.push({
            action: migrate_options[target],
            priority: migrate_options.priority || 99,
            name: model_name,
            migration: migration_name,
        });
    }

    return migrations;
}