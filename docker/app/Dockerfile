FROM node:lts-alpine3.20 AS base

LABEL maintainer="Iqbal Hikmat Prahara"

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm i -g pnpm

# Set System Default Timezone
ENV TZ='Asia/Jakarta'

# Install required package
RUN apk --update --no-cache add tzdata


#### DEVELOPMENT BUILD STAGE #####
FROM base AS dev

ENV NODE_ENV development

# Install required package
RUN apk --update --no-cache add openssl openssh git zsh nano make shadow curl

RUN set -xe; \
    mkdir -p /home/node/.antigen; \
    curl -L git.io/antigen > /home/node/.antigen/antigen.zsh;

COPY ./docker/app/.zshrc /home/node/.zshrc

RUN chown -R node:node /home/node/.antigen /home/node/.zshrc;

# Clean up alpine package
RUN apk del shadow curl
RUN rm -rf /var/cache/apk/*

USER node

RUN set -xe; \
    /bin/zsh /home/node/.zshrc; \
    git config --global core.editor "nano";

WORKDIR /usr/src/app