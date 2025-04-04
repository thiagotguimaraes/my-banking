
# ### Install postgres
# sudo apt update
# sudo apt install postgresql postgresql-contrib

# ### Enable postgres service
# sudo systemctl enable postgresql
# sudo systemctl services postgresql
# sudo systemctl status postgresql

### Get the directory of the current script
SCRIPT_DIR=$(dirname "$(realpath "$0")")

### Construct the path to the .env file (parent directory of the script)
ENV_FILE="$SCRIPT_DIR/../.env"

### Load environment variables
if [ -f "$ENV_FILE" ]; then
  export $(grep -v '^#' "$ENV_FILE" | xargs)
else
  echo "Error: .env file not found at $ENV_FILE."
  exit 1
fi

### Check required variables
if [ -z "$DB_NAME" ] || [ -z "$DB_USER" ] || [ -z "$DB_PASSWORD" ]; then
  echo "Error: Missing required environment variables. Please check your .env file."
  exit 1
fi

### Create the database and admin user
sudo -u postgres psql <<EOF
DROP DATABASE $DB_NAME;
EOF

### Create the database and admin user
sudo -u postgres psql <<EOF
CREATE DATABASE $DB_NAME;
CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
EOF

### Grant privileges to the public schema
sudo -u postgres psql -d $DB_NAME <<EOF
GRANT USAGE ON SCHEMA public TO $DB_USER;
GRANT CREATE ON SCHEMA public TO $DB_USER;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $DB_USER;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $DB_USER;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO $DB_USER;
EOF

# ### Create admin / admin user
# sudo -u postgres psql -d $DB_NAME <<EOF
# INSERT INTO "user" (email, "passwordHash", role, "createdAt")
# VALUES ('admin', 'admin', 'user', NOW());
# EOF


### Run psql
# sudo -u postgres psql my_banking