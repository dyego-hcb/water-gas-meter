# Use a imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código fonte
COPY . .

# Compila o código TypeScript
RUN npm run build

# Define a variável de ambiente para a porta
ENV PORT=3000

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "npm", "run", "start:dev" ]
