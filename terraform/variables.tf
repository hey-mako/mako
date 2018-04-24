variable "api_key" {
  description = "Heroku API token"
}

variable "email" {
  description = "Email to be notified by Heroku"
}

variable "prefix" {
  default     = "default"
  description = "A string to prefix the name of the application with"
}

variable "region" {
  default     = "us"
  description = "The region that the application should be deployed in"
}
