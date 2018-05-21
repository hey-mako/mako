FROM node:alpine
ENV NODE_ENV production
WORKDIR /srv
COPY package.json .
RUN yarn install --frozen-lockfile --silent
COPY . .
EXPOSE 3000
CMD ["yarn", "run", "start"]
