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

# Wait for docker to be fully ready
sleep 10

cd /home/ubuntu
git clone https://github.com/Chandangadewar/Tasty-hub-app.git
chown -R ubuntu:ubuntu /home/ubuntu/Tasty-hub-app

cat > /home/ubuntu/Tasty-hub-app/docker/.env << 'ENVEOF'
DB_ROOT_PASSWORD=rootpassword123
DB_NAME=restaurant_db
DB_USER=tastyhub
DB_PASSWORD=tastyhub123
SESSION_SECRET=supersecretkey123
DD_API_KEY=dummy
DOCKER_USERNAME=chandan240603
ENVEOF

cd /home/ubuntu/Tasty-hub-app/docker

# Install Docker Compose V2
curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-linux-x86_64" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

docker-compose up -d
EOF

  tags = {
    Name    = "TastyHub-Server"
    Project = "TastyHub"
    Env     = "Production"
  }
}
