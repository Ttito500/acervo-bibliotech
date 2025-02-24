output "instance_ip" {
  description = "IP público da instância"
  value       = google_compute_instance.docker_instance.network_interface[0].access_config[0].nat_ip
}
