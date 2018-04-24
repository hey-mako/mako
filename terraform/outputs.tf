output "name" {
  value = "${heroku_app.default.name}"
}

output "all_config_vars" {
  value = "${heroku_app.default.all_config_vars}"
}
