### Supabase Migration Process

1. **Create a New Migration:**

   Run the following command to create a new migration:

   ```bash
   supabase migration new <new-migration-name>
   ```

2. **Input the SQL Migration Query:**

   Paste or input your new SQL migration query into the generated migration file.

3. **Clear Existing Migrations:**

   Navigate to your Supabase cloud project and execute the following SQL query to clear all existing migrations:

   ```sql
   DELETE FROM supabase_migrations.schema_migrations;
   ```

   **Note:** This will delete all migrations. Ensure you have backups if needed.

4. **Push the New Migration:**

   Push the new migration to your database with the command:

   ```bash
   supabase db push
   ```

5. **List Migrations:**

   You can list both local and remote migrations using:

   ```bash
   supabase migration list
   ```

6. **Important Note:**

   Before running the migration, ensure to delete all existing tables to avoid conflicts with names that already exist.
