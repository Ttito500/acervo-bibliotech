resource "google_compute_instance" "docker_instance" {
  name         = var.instance_name
  machine_type = "f1-micro"
  zone         = var.zone

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network       = "default"
    access_config {}  # IP público
  }

  metadata = {
    startup-script = templatefile("${path.module}/startup.sh.tpl", {
      repo_url    = var.repo_url

      db_name          = var.db_name
      db_user          = var.db_user
      db_port          = var.db_port 
      db_schema_name   = var.db_schema_name 
      db_password      = var.db_password

      jdbc_url         = var.jdbc_url
      api_port         = var.api_port

      email_smtp       = var.email_smtp 
      senha_email_smtp = var.senha_email_smtp

      jwt_secret       = var.jwt_secret
    })
  }
}