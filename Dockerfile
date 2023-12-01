FROM  node:20
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm i
EXPOSE 4001
CMD ["npm", "start"]

