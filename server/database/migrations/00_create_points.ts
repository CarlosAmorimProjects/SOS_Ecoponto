import Knex from 'knex';

export async function up(knex: Knex) {
   return knex.schema.createTable('points', table => {
        table.increments('id').primary();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
    });
}

export async function down(knex: Knex) {
   return knex.schema.dropTable('point');
}