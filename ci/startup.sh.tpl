#!/bin/bash
set -e

apt-get update && apt-get install -y docker.io docker-compose git

systemctl start docker

export DB_NAME="${db_name}"
export DB_USER="${db_user}"
export DB_PORT="${db_port}"
export JDBC_URL="${jdbc_url}"
export DB_SCHEMA_NAME="${db_schema_name}"
export API_PORT="${api_port}"
export EMAIL_SMTP="${email_smtp}"
export DB_PASSWORD="${db_password}"
export SENHA_EMAIL_SMTP="${senha_email_smtp}"
export JWT_SECRET="${jwt_secret}"
export PGADMIN_DEFAULT_EMAIL="${pgadmin_default_email}"
export PGADMIN_DEFAULT_PASSWORD="${pgadmin_default_password}"
export PGADMIN_LISTEN_PORT="${pgadmin_listen_port}"
export PGADMIN_PORT="${pgadmin_port}"

git clone "${repo_url}" /opt/app
cd /opt/app

# Cria o arquivo .env para a aplicação
cat << EOT > .env
DB_NAME=${db_name}
DB_USER=${db_user}
DB_PORT=${db_port}
JDBC_URL=${jdbc_url}
DB_SCHEMA_NAME=${db_schema_name}
EMAIL_SMTP=${email_smtp}
API_PORT=${api_port}
DB_PASSWORD=${db_password}
SENHA_EMAIL_SMTP=${senha_email_smtp}
JWT_SECRET=${jwt_secret}
PGADMIN_DEFAULT_EMAIL=${pgadmin_default_email}
PGADMIN_DEFAULT_PASSWORD=${pgadmin_default_password}
PGADMIN_LISTEN_PORT=${pgadmin_listen_port}
PGADMIN_PORT=${pgadmin_port}
EOT

cd bibliotech/bibliotech

# Roda apenas o banco e a API
sudo docker-compose --env-file /opt/app/.env up -d --build postgres api
