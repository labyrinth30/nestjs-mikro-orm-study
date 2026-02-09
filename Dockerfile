FROM node:22-alpine

# 1. pnpm 활성화 (Corepack 사용)
RUN corepack enable

WORKDIR /usr/src/app

# 2. 의존성 파일 복사
COPY package.json pnpm-lock.yaml ./

# 3. 의존성 설치
# --frozen-lockfile: lock 파일이 변경되지 않도록 강제 (CI/Docker 환경 권장)
RUN pnpm install --frozen-lockfile

COPY . .

CMD ["pnpm", "run", "start:dev"]
