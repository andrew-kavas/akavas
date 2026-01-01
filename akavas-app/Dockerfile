# Base stage
FROM node:alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Development stage
FROM base as development
COPY . .
CMD ["npm", "run", "dev"]

# Build stage
FROM base as build
COPY . .
RUN npm run build

# Production stage with nginx
FROM nginx:alpine as production

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
