# L'mrhala 1: Build dyal l'application b Node.js
FROM node:22-alpine as build

# N7ddo dossier dyal lkhdma
WORKDIR /app

# Ncoppiw les fichiers dyal les packages o n'installiw dependencies
COPY package*.json ./
RUN npm install

# Ncoppiw l'code dyalna kaml o ndiro build
COPY . .
RUN npm run build

# L'mrhala 2: Serveur web (Nginx) bach n'hostiw les fichiers
FROM nginx:alpine

# Ncoppiw les fichiers li t-buildaw f l'mrhala l'wla l Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Ncoppiw configuration dyal Nginx (ghadi nsayboha f lkhtwa jaya)
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# N7llo port 80 wst l'container
EXPOSE 80

# Nch3lo Nginx
CMD ["nginx", "-g", "daemon off;"]