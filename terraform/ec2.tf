resource "aws_instance" "tastyhub_server" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.tastyhub_sg.id]

  user_data = <<-EOF
    #!/bin/bash
    apt-get update -y
    apt-get install -y docker.io docker-compose git
    systemctl start docker
    systemctl enable docker
    usermod -aG docker ubuntu
    cd /home/ubuntu
    git clone https://github.com/Chandangadewar
    cd tasty-hub
    echo "DB_PASSWORD=your_password" > .env
    echo "SESSION_SECRET=tastyhub_secret" >> .env
    docker-compose -f docker/docker-compose.yml up -d
  EOF

  tags = {
    Name    = "TastyHub-Server"
    Project = "TastyHub"
    Env     = "Production"
  }
}