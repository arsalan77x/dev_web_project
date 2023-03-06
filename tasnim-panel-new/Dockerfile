FROM node:16 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
RUN yarn --silent
COPY . /app
RUN yarn build
RUN yarn global add serve
CMD ["serve", "-p", "3000", "-s", "build"]
