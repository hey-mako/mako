FROM node:alpine
ARG NODE_ENV=production
WORKDIR /srv
COPY package.json .
RUN NODE_ENV=$NODE_ENV yarn install --frozen-lockfile --silent
COPY . .
EXPOSE 3000
CMD ["yarn", "run", "start"]
