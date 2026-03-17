# syntax=docker/dockerfile:1
FROM oven/bun:1.3.10-debian

RUN apt-get update && apt-get install -y \
  ca-certificates \
  curl \
  git \
  locales \
  tree \
  unzip \
  && rm -rf /var/lib/apt/lists/* \
  && sed -i 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen \
  && locale-gen

ENV LANG=en_US.UTF-8
ENV PATH="${BUN_INSTALL_BIN}:${PATH}"

WORKDIR /workspaces

USER bun
