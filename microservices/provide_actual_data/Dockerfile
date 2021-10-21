FROM node:14
WORKDIR /app
ENV PORT=5001
ENV RABBIT_URL='amqp://10.0.0.30:5672'
COPY . .
RUN npm i

EXPOSE 5001
CMD [ "node", "index.js" ]

