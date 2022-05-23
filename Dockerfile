FROM node:16.15-alpine3.14 as development

RUN wget -qO- https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /usr/src/app

COPY .npmrc package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM node:16.15-alpine3.14 as production

RUN wget -qO- https://get.pnpm.io/v6.16.js | node - add --global pnpm

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY .npmrc package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "./dist/index.js" ]
