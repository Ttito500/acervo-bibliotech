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

git clone "${repo_url}" /opt/app
cd /opt/app

cd bibliotech/bibliotech

# Roda apenas o banco e a API
docker-compose up -d --build postgres api
