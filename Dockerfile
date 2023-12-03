FROM  node:18-alpine
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm i
EXPOSE 4001
CMD ["npm", "start"]

