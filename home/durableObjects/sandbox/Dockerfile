FROM docker.io/cloudflare/sandbox:0.6.3

RUN apt-get update && apt-get install -y lsof\
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

COPY src/ /workspace/
RUN npm install

EXPOSE 7070
