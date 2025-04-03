### Load environment variables
source .env

### Install postgres
sudo apt update
sudo apt install postgresql postgresql-contrib

### Enable postgres service
sudo systemctl enable postgresql
sudo systemctl services postgresql
sudo systemctl status postgresql

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