ARG node_version
FROM node:${node_version}-bullseye-slim as ci
ARG workdir

RUN apt-get update \
 && apt-get install -y \
  jq \
  git \
  g++ \
  make \
  openssh-client \
  python3 \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* \
  ;

# create dirs and permission for cache/mount volumes
RUN install -d -m 0755 -o node -g node \
  $workdir \
  $workdir/.yarn \
  $workdir/.yarn/cache \
  $workdir/.firebase \
  $workdir/node_modules \
  $workdir/packages \
  $workdir/packages/console \
  $workdir/packages/console/dist \
  $workdir/packages/console/node_modules \
  $workdir/packages/console/.next \
  $workdir/packages/hasura \
  $workdir/packages/hasura/node_modules \
  $workdir/packages/components \
  $workdir/packages/components/node_modules \
  ;

WORKDIR ${workdir}
USER node

FROM node:${node_version}-bullseye-slim as development
ARG workdir

RUN apt-get update \
 && apt-get install -y \
  jq \
  git \
  g++ \
  make \
  openssh-client \
  python3 \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* \
  ;

# create dirs and permission for cache/mount volumes

COPY --from=ci --chown=node:node $workdir $workdir

COPY --chown=node:node \
         ./package.json \
  $workdir/package.json
COPY --chown=node:node \
         ./yarn.lock \
  $workdir/yarn.lock
COPY --chown=node:node \
         ./.yarnrc \
  $workdir/.yarnrc

COPY --chown=node:node \
         ./packages/console/package.json \
  $workdir/packages/console/package.json
COPY --chown=node:node \
         ./packages/hasura/package.json \
  $workdir/packages/hasura/package.json
COPY --chown=node:node \
         ./packages/components/package.json \
  $workdir/packages/components/package.json

WORKDIR ${workdir}
USER node

RUN yarn install --frozen-lockfile \
 && yarn cache clean \
 ;

FROM node:${node_version}-bullseye-slim as emulators
ARG workdir

RUN apt-get update \
 && apt-get install -y \
    openjdk-17-jre-headless \
    jq \
    git \
    curl \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* \
 ;

RUN install -d -m 0755 -o node -g node /firebase

COPY --from=development --chown=node:node $workdir $workdir
COPY --chown=node:node ./bin $workdir/bin

WORKDIR ${workdir}
USER node

RUN curl -LO https://github.com/unicode-org/icu/releases/download/release-72-1/icu4j-72_1.jar \
;

RUN yarn firebase setup:emulators:firestore \
 && yarn firebase setup:emulators:storage \
 && yarn firebase setup:emulators:pubsub \
 && yarn firebase setup:emulators:ui \
 ;

EXPOSE 4000 4500 5001 8080 8085 9099 9199
CMD sh bin/runtimeconfig.sh > .runtimeconfig.sh \
 && yarn firebase --project='demo-project' emulators:start \
    --import="${FIREBASE_EMULATOR_IMPORT}" --export-on-exit

FROM mcr.microsoft.com/playwright:focal as playwright
ARG workdir

RUN groupmod -n node pwuser \
  && usermod -l node pwuser

COPY --from=development --chown=node:node $workdir $workdir

WORKDIR ${workdir}
USER node

FROM ubuntu/postgres AS postgres
RUN apt-get update \
 && apt-get install -y postgresql-14-cron \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* \
