[![Build Status](https://travis-ci.com/mako-ai/mako.svg?token=kDZcsygosGgqF2WJJ1jZ&branch=master)](https://travis-ci.com/mako-ai/mako)

## Docker

This repository uses Docker [Community Edition](https://www.docker.com/community-edition) (CE) version `18.03.0-ce`.

    $ docker-compose up -d

The `-d` flag instructs Docker to run the containers in 'detached' mode.

## Testing

    $ docker-compose -f docker-compose.test.yml up

## Deployment

The following repository contains the Terraform configurations for the Heroku deployment pipeline: https://github.com/jasonwalsh/terraform-configurations.

Please refer to the README for instructions on creating the necessary pipeline resources.
