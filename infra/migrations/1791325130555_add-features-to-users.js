exports.up = (pgm) => {
  pgm.addColumn("users", {
    features: {
      type: "varchar[]",
      notNull: true,
      default: "{}", // {} is an array value on Postgres
    },
  });
};

exports.down = false;
