exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    // For reference Github limits usernames to 39 characters
    username: {
      type: "varchar(30)",
      notNull: true,
      unique: true,
    },

    // why 254 in length? https://stackoverflow.com/a/1199238
    email: {
      type: "varchar(254)",
      notNull: true,
      unique: true,
    },

    // why 72 in lenght? https://security.stackexchange.com/q/39849
    password: {
      type: "varchar(72)",
      notNull: true,
    },
    
    // timestamptz ~ with "tz" because we wanna have the timezone of the where it was created
    // https://justatheory.com/2012/04/postgres-use-timestamptz 
    createdAt: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()"),
    },
    updatedAt: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()"),
    },
  })
};

// "false" diz para o módulo que não existe o ~movimento~ "down" nessa migration.
// apenas o que está declarado acima, "up".
exports.down = false; 
