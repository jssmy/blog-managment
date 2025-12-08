<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Blog Management API built with NestJS, MongoDB, and Mongoose.

## Tech Stack

- **NestJS**: 11.1.9
- **Node.js**: 22.12 LTS (Docker)
- **MongoDB**: 8.0 (Docker)
- **Mongoose**: 8.20.2
- **TypeScript**: 5.6.0

## Project setup

### Local Development

```bash
$ npm install
```

### Docker Setup

1. Copy the environment template:
```bash
$ cp env.template .env
```

2. Configure your `.env` file with your credentials

3. Start the services:
```bash
$ docker-compose up -d
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Environment Variables

Copy `env.template` to `.env` and configure the following variables:

- **PORT**: Application port (default: 3001)
- **MONGO_DB_VERSION**: MongoDB version for Docker (default: 8.0)
- **MONGO_INITDB_ROOT_USERNAME**: MongoDB root username
- **MONGO_INITDB_ROOT_PASSWORD**: MongoDB root password
- **MONGO_INITDB_DATABASE**: MongoDB database name
- **MONGO_INITDB_HOST**: MongoDB host (use `mongo-blog` for Docker)
- **MONGO_INITDB_PORT**: MongoDB port (default: 27017)
- **JWT_TOKEN_SECRET**: JWT access token secret (min 32 chars)
- **JWT_TOKEN_EXPIRE**: JWT access token expiration (e.g., 15m)
- **JWT_REFRESH_TOKEN_SECRET**: JWT refresh token secret (min 32 chars)
- **JWT_REFRESH_TOKEN_EXPIRE**: JWT refresh token expiration (e.g., 7d)

## Docker Deployment

The application uses multi-stage Docker builds for optimized production images:

```bash
# Build and start all services
$ docker-compose up -d

# View logs
$ docker-compose logs -f

# Stop services
$ docker-compose down

# Rebuild after changes
$ docker-compose up -d --build
```

### Docker Images

- **Node.js**: `node:22.12-alpine` (LTS, optimized for NestJS 11.x)
- **MongoDB**: `mongo:8.0` (latest stable)
- **Nginx**: `nginx:1.27-alpine` (reverse proxy with SSL/TLS)

## SSL/HTTPS Configuration

The application uses Nginx as a reverse proxy with Let's Encrypt SSL certificates for HTTPS.

### Initial SSL Setup

1. **Install Certbot** (if not already installed):
```bash
# Ubuntu/Debian
sudo apt install certbot

# macOS
brew install certbot

# CentOS/RHEL
sudo yum install certbot
```

2. **Obtain SSL Certificate**:
```bash
# Run the setup script
./setup-ssl.sh your-email@example.com bugzilo.com

# Or manually with certbot
sudo certbot certonly --standalone \
  --preferred-challenges http \
  --email your-email@example.com \
  --agree-tos \
  -d bugzilo.com \
  -d www.bugzilo.com
```

3. **Start the application**:
```bash
docker-compose up -d --build
```

### SSL Features

- ✅ **HTTPS on port 3001** with TLS 1.2/1.3
- ✅ **HTTP to HTTPS redirect** (port 80 → 3001)
- ✅ **Modern SSL configuration** with strong ciphers
- ✅ **Security headers** (HSTS, X-Frame-Options, etc.)
- ✅ **Automatic certificate renewal** via Let's Encrypt

### Access URLs

- **HTTPS (recommended)**: `https://bugzilo.com:3001/`
- **HTTP (redirects to HTTPS)**: `http://bugzilo.com/` → `https://bugzilo.com:3001/`

### Certificate Renewal

Certificates renew automatically every 90 days. To renew manually:
```bash
sudo certbot renew
docker-compose restart nginx-blog
```

### CORS Configuration

The API is configured to accept requests only from:
- `hardcodeando.com` (with/without www, HTTP/HTTPS)
- `bugzilo.com` (with/without www, HTTP/HTTPS)

### Rate Limiting (Throttling)

The API implements global rate limiting to prevent abuse:

- **Short**: 3 requests per second
- **Medium**: 20 requests per 10 seconds
- **Long**: 100 requests per minute

When the limit is exceeded, clients receive:
```json
{
  "statusCode": 429,
  "message": "ThrottlerException: Too Many Requests"
}
```

Rate limiting is applied globally to all endpoints by default.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
