FROM node:alpine as builder

RUN npm i -g npm

WORKDIR /app
COPY . .
RUN npm i
RUN npm run build:prod

FROM node:alpine as production

ENV NODE_ENV production
ENV SECRET topsecret

RUN echo "http://dl-cdn.alpinelinux.org/alpine/v3.6/main" >> /etc/apk/repositories
RUN echo "http://dl-cdn.alpinelinux.org/alpine/v3.6/community" >> /etc/apk/repositories
RUN apk update

RUN apk add mongodb mongodb-tools --no-cache
RUN mkdir -p /data/db
RUN npm i -g npm

WORKDIR /app
COPY --from=builder /app/package.json .
COPY --from=builder /app/dist/apps .
RUN npm i --omit=dev

COPY ./start.sh .
RUN chmod +x start.sh

EXPOSE 80
EXPOSE 3333
ENTRYPOINT ["./start.sh"]
