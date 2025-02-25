resource "google_compute_network" "vpc_network" {
  name                    = "my-custom-mode-network"
  auto_create_subnetworks = false
  mtu                     = 1460
}

resource "google_compute_subnetwork" "default" {
  name          = "my-custom-subnet"
  ip_cidr_range = "10.0.1.0/24"
  region        = var.region
  network       = google_compute_network.vpc_network.id

}

resource "google_compute_instance" "default" {
  name         = var.instance_name
  machine_type = "e2-medium"
  zone         = var.zone
  tags         = ["ssh"]

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  metadata_startup_script = templatefile("${path.module}/startup.sh.tpl", {
    repo_url         = var.repo_url

    db_name          = var.db_name
    db_user          = var.db_user
    db_port          = var.db_port 
    db_schema_name   = var.db_schema_name 
    db_password      = var.db_password

    jdbc_url         = var.jdbc_url
    api_port         = var.api_port

    email_smtp       = var.email_smtp 
    senha_email_smtp = var.senha_email_smtp

    pgadmin_default_email = var.pgadmin_default_email 
    pgadmin_listen_port = var.pgadmin_listen_port 
    pgadmin_port = var.pgadmin_port
    pgadmin_default_password = var.pgadmin_default_password

    jwt_secret       = var.jwt_secret
  })

  network_interface {
    subnetwork = google_compute_subnetwork.default.id

    access_config {}
  }
}

resource "google_compute_firewall" "ssh" {
  name = "allow-ssh"
  allow {
    ports    = ["22"]
    protocol = "tcp"
  }
  direction     = "INGRESS"
  network       = google_compute_network.vpc_network.id
  priority      = 1000
  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["ssh"]
}

resource "google_compute_firewall" "bibliotech" {
  name    = "bibliotech-firewall"
  network = google_compute_network.vpc_network.id

  allow {
    protocol = "tcp"
    ports    = ["8090"]
  }
  source_ranges = ["0.0.0.0/0"]
}

output "Web-server-URL" {
 value = join("",["http://",google_compute_instance.default.network_interface.0.access_config.0.nat_ip,":8090"])
}