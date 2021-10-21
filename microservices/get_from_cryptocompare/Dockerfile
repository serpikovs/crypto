FROM node:14
WORKDIR /app
ENV PORT=5002
COPY . .
RUN npm i

EXPOSE 5002
CMD [ "node", "index.js" ]

