output "public_ip" {
  value       = aws_instance.tastyhub_server.public_ip
  description = "EC2 Public IP - use this to access your app"
}

output "public_dns" {
  value       = aws_instance.tastyhub_server.public_dns
  description = "EC2 Public DNS"
}

output "ssh_command" {
  value       = "ssh -i your-key.pem ubuntu@${aws_instance.tastyhub_server.public_ip}"
  description = "SSH command to connect to EC2"
}