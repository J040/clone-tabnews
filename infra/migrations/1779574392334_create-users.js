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

    // why 60 in lenght? (search for "Hash Info" on https://www.npmjs.com/package/bcrypt)
    password: {
      type: "varchar(60)",
      notNull: true,
    },
    
    // Why timestamp with timezone? https://justatheory.com/2012/04/postgres-use-timestamptz 
    // timestamptz ~ with "tz" because we wanna have the timezone from where it was created
    createdAt: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
    updatedAt: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
  })
};

// "false" diz para o módulo que não existe o ~movimento~ "down" nessa migration.
// apenas o que está declarado acima, "up".
exports.down = false; 
