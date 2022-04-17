/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries in Todo table
  await knex('todo').del()
  await knex('todo').insert([
    {id: "1" ,title: 'rowValue1'},
    {id: "2" ,title: 'rowValue2'},
    {id: "3" ,title: 'rowValue3'}
  ]);

  // Deletes ALL existing entries in subtask table
  await knex('subtask').del()
  await knex('subtask').insert([
    {todo_id: "1" ,title: 'rowValue1'},
    {todo_id: "2" ,title: 'rowValue2'},
    {todo_id: "2" ,title: 'rowValue3'}
  ]);
};
