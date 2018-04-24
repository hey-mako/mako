provider "heroku" {
  api_key = "${var.api_key}"
  email   = "${var.email}"
}

resource "random_pet" "default" {
  lifecycle {
    create_before_destroy = true
  }

  prefix = "${var.prefix}"
}

resource "heroku_app" "default" {
  buildpacks = [
    "heroku/nodejs",
  ]

  config_vars = "${var.config_vars}"

  name   = "${random_pet.default.id}"
  region = "${var.region}"
}
