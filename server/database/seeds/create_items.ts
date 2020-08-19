import Knex from 'knex';

export async function seed (knex: Knex) {
    await knex('items').insert([
        { title: 'Lampadas', image: 'lampadas.svg' },
        { title: 'Pilhas e baterias', image: 'baterias.svg' },
        { title: 'Papéis e Papelão', image: 'papeis-papelao.svg' },
        { title: 'Residuos electrónicos', image: 'electronicos.svg' },
        { title: 'Residuos orgânicos', image: 'organicos.svg' },
        { title: 'Óleo de cozinha', image: 'oleo.svg' },
    ]);
}

