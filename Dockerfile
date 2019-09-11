FROM node:10.15.0

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install 
RUN npm install pm2 -g

# start app
CMD ["npm", "run", "prod"]
