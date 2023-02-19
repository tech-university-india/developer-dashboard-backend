
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename the responses table to survey_responses
    await queryInterface.renameTable('responses', 'survey_responses');


    //add unique constraint to survey_id
    await queryInterface.addConstraint('surveys', {
      fields: ['survey_id'],
      type: 'unique',
      name: 'survey_id_unique'
    });

    // Rename the questions table to survey_questions
    await queryInterface.renameTable('questions', 'survey_questions');

    // Add a status column to the survey table
    await queryInterface.addColumn('surveys', 'status', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {

    // Remove the status column from the survey table
    await queryInterface.removeColumn('surveys', 'status');

    // Rename the survey_responses table back to responses
    await queryInterface.renameTable('survey_responses', 'responses');

    // Rename the survey_questions table back to questions
    await queryInterface.renameTable('survey_questions', 'questions');

    // Remove the unique constraint from the survey_id column
    await queryInterface.removeConstraint('surveys', 'survey_id_unique');
  }
};