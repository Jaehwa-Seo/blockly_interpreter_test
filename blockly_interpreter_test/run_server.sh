lsof -i :5678 | awk '{system("kill -9 " $2)}'

node server.js