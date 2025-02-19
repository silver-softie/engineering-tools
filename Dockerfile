#
# Build phase
#

# Download Node Alpine image
FROM node:alpine AS build

# Set the current working directory
WORKDIR /usr/src/app

# Copy the package dependencies
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy all the other files. It's inefficient as we're probably copying more than we need but...
# This isn't a huge deal as this is just the build phase.
COPY . .

# Build the Angular application in production mode.
RUN npm run build --prod

#
# Deploy phase
#

# Download the Nginx image
FROM nginx:alpine

# Copy the built Angular application to the Nginx HTML folder
COPY --from=build /usr/src/app/dist/engineering-tools/browser /usr/share/nginx/html

EXPOSE 80
