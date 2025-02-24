variable "instance_name" {
  description = "Nome da instância"
  type        = string
}

variable "zone" {
  description = "Zona para a VM"
  type        = string
}

variable "repo_url" {
  description = "URL do repositório"
  type        = string
}

variable "db_name" {
  description = "Nome do banco de dados"
  type        = string
}

variable "db_user" {
  description = "Usuário do banco de dados"
  type        = string
}

variable "db_port" {
  description = "Porta do banco de dados"
  type        = number
}

variable "jdbc_url" {
  description = "String de conexao"
  type        = string
}

variable "db_schema_name" {
  description = "Schema padrão"
  type        = string
}

variable "api_port" {
  description = "Porta da API"
  type        = number
}

variable "email_smtp" {
  description = "Email para o SMTP"
  type        = string
}

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
