FROM node:20.14.0

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm-dev \
    libpango1.0-0 \
    libasound2 \
    libxtst6 \
    libxss1 \
    libnss3 \
    libxshmfence1 \
    libegl1 \
    libgdk-pixbuf2.0-0 \
    libxkbcommon0 \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*


COPY package*.json ./

RUN npm install

COPY . .

RUN npm install puppeteer --ignore-scripts

RUN node ace build

RUN cd build && npm install

EXPOSE 3333

CMD ["node", "build/bin/server.js"]
