/* An example Sequelize model; modify as you see fit */

export default function (connection, dataTypes) {
  const Book = connection.define(
    'Book',
    {
      name: {
        field: 'name',
        type: dataTypes.STRING,
      },
      author: {
        field: 'author',
        type: dataTypes.STRING,
      },
      createdAt: {
        field: 'created_at',
        type: dataTypes.DATE,
      },
      updatedAt: {
        field: 'upated_at',
        type: dataTypes.DATE,
      },
    },
    {
      tableName: 'book',
      classMethods: {
        /* Configure any foreign key constraints
        associate: function associate(models) {
        },
        */

        /* Handle any initialization
        initialize: function initialize(config) {
        }
        */
      },
    },
  );

  return Book;
}
