FROM node:24-trixie-slim

RUN apt-get update && apt-get install -y --no-install-recommends lsof \
    && rm -rf /var/lib/apt/lists/*

COPY --from=docker.io/cloudflare/sandbox:1.0.3 /usr/local/bin/sandbox-shim /usr/local/bin/sandbox-shim

WORKDIR /workspace

COPY src/ /workspace/
RUN npm install

CMD ["sleep", "infinity"]
