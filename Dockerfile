FROM node:16

WORKDIR /app

# Copy the backend directory
COPY backend/ ./

# Install dependencies with --no-package-lock to avoid lock file issues
RUN npm install --no-package-lock

# Build the Strapi application
RUN npm run build

# Set production environment
ENV NODE_ENV=production

# Expose the Strapi port
EXPOSE 1337

# Start command
CMD ["npm", "start"]