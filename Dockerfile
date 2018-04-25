FROM node:alpine
WORKDIR /srv
COPY package.json .
RUN yarn install --frozen-lockfile --no-bin-links --silent
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
