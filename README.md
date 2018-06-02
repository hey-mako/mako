# Mako
[![CircleCI](https://circleci.com/gh/mako-ai/mako.svg?style=shield&circle-token=1c7bbcb6cb0fb57e80aedd600886dac278d5da7b)](https://circleci.com/gh/mako-ai/mako)

## Docker

This repository uses Docker [Community Edition](https://www.docker.com/community-edition) (CE) version `18.03.0-ce`.

    $ docker-compose up -d

The `-d` flag instructs Docker to run the containers in 'detached' mode.

## Testing

    $ docker-compose -f docker-compose.test.yml up

## Deployment

The following repository contains the Terraform configurations for the Heroku deployment pipeline: https://github.com/mako-ai/terraform-heroku-configuration.

Please refer to the README for instructions on creating the necessary pipeline resources.
