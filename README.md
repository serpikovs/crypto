# CRYPTO

## 1. Installation

1) Run ./infrastructure/docker-compose.yml
2) Then run ./microservices/docker-compose.yml

## 2. How to use

For example: http://localhost:5000/getActual?fsyms=BTC,LTC&tsyms=USD,RUR 

Available params:

fsyms: 'BTC', 'XRP', 'ETH', 'BCH', 'EOS', 'LTC', 'XMR', 'DASH'

tsyms: 'USD', 'JPY', 'EUR', 'GBP', 'RUR'

## 3. How it works

There are two microservices:

 - get_from_cryptocompare - it ask cryptocompare API every minute and save data to SQL and Redis. If it cannot obtain data - no actions. 
 - provide_actual_data - it provide data from Redis if last timestamp is fresh (3 minutes), or from SQL if Redis timestamp older than 3 minutes

 