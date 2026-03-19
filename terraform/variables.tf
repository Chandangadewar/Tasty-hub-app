variable "aws_region" {
  description = "AWS region"
  default     = "ap-south-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  default     = "t3.micro"
}

variable "key_name" {
  description = "AWS Key Pair name"
  type        = string
}

variable "ami_id" {
  description = "Ubuntu 22.04 AMI ID for ap-south-1"
  default     = "ami-0f5ee92e2d63afc18"
}
