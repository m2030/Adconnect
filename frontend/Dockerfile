FROM node:20-alpine
WORKDIR /usr/src/app

# ensure we have both files; this will cause a clear error if lock is missing
COPY package.json package-lock.json ./

# optional: speed up rebuilds by using npm cache
# RUN --mount=type=cache,target=/root/.npm npm ci
RUN npm ci

COPY . .
EXPOSE 5173
