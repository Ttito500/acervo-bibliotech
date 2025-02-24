variable "project_id" {
  description = "ID do projeto na GCP"
  type        = string
  default     = "bibliotech-451801"
}

variable "region" {
  description = "Região para os recursos"
  type        = string
  default     = "us-central1"
}

variable "zone" {
  description = "Zona para a VM"
  type        = string
  default     = "us-central1-a"
}

variable "instance_name" {
  description = "Nome da instância"
  type        = string
  default     = "bibliotech-instance"
}

variable "repo_url" {
  description = "URL do repositório"
  type        = string
  default     = "https://github.com/Ttito500/acervo-bibliotech.git"
}

variable "db_name" {
  description = "Nome do banco de dados"
  type        = string
  default     = "bibliotech"
}

variable "db_user" {
  description = "Usuário do banco de dados"
  type        = string
  default     = "postgres"
}

variable "db_port" {
  description = "Porta do banco de dados"
  type        = number
  default     = 5432
}

variable "jdbc_url" {
  description = "String de conexao"
  type        = string
  default     = "jdbc:postgresql://postgres:5432/bibliotech"
}

variable "db_schema_name" {
  description = "Schema padrão"
  type        = string
  default     = "adelino_cunha"
}

variable "api_port" {
  description = "Porta da API"
  type        = number
  default     = 8090
}

variable "email_smtp" {
  description = "Email para o SMTP"
  type        = string
  default     = "testeacervo01@gmail.com"
}

# Variáveis secretas (não definir default)
variable "db_password" {
  description = "Senha do banco de dados"
  type        = string
  sensitive   = true
}

variable "senha_email_smtp" {
  description = "Senha do email SMTP"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "Senha para gerar o JWT"
  type        = string
  sensitive   = true
}
