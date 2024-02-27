FROM node:latest

WORKDIR /usr/src/facebrain

COPY ./ ./

RUN npm i
CMD ["/bin/bash"]