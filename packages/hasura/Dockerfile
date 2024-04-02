#############################################################
ARG hasura_version
FROM hasura/graphql-engine:${hasura_version}-ce as base

#############################################################
ARG version
FROM debian:12-slim as graphql-engine

RUN apt-get update \
  #&& apt-get install -y --no-install-recommends  \
  #   gnupg2 \
  #   apt-transport-https \
  #&& apt-get update \
  && apt-get install -y --no-install-recommends \
     ca-certificates \
     libkrb5-3 \
     libpq5 \
     libnuma1 \
     libodbc1 \
     libmariadb3 \
  #   unixodbc-dev \
  #   default-libmysqlclient-dev \
  #   default-mysql-client \
     netbase \
     jq \
     haproxy \
  && rm -rf /var/lib/apt/lists/*

ARG uid=1000
ARG gid=1000

RUN groupadd -g ${gid} hasura && useradd -m -u ${uid} -g hasura hasura
COPY --from=base --chown=hasura:hasura /bin/graphql-engine /bin/graphql-engine
COPY --chown=haproxy:haproxy ./haproxy.cfg /etc/haproxy/haproxy.cfg
ADD --chown=hasura:hasura ./entrypoint.sh /entrypoint.sh

USER hasura
ENTRYPOINT ["/entrypoint.sh"]
CMD ["/bin/graphql-engine", "serve"]
