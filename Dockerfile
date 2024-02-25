FROM node:21.5.0

WORKDIR /usr/src/facebrain

COPY ./ ./

RUN npm i
CMD ["/bin/bash"]