FROM docker.io/cloudflare/sandbox:0.6.3

RUN apt-get update && apt-get install -y lsof\
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

COPY src/ /workspace/
RUN npm install
RUN npm install -g @hono/cli

EXPOSE 7070
