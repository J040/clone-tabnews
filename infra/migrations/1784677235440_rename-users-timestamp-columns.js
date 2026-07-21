exports.up = (pgm) => {
  pgm.sql(`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'users' AND column_name = 'createdAt'
      ) THEN
        ALTER TABLE users RENAME COLUMN "createdAt" TO created_at;
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'users' AND column_name = 'updatedAt'
      ) THEN
        ALTER TABLE users RENAME COLUMN "updatedAt" TO updated_at;
      END IF;
    END $$;
  `);
};

exports.down = false;
