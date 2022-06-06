FROM ubuntu:18.04
MAINTAINER John Wati  <wati@enezaeducation.com>

ADD conf/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
# Install Environment
ENV DEBIAN_FRONTEND=noninteractive


RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get -y install software-properties-common
# RUN add-apt-repository -y ppa:ondrej/php
RUN apt-get update
RUN apt-get install nginx -y 

#Install GIT
RUN apt-get -y update
RUN apt install -y git ssh

# Install
RUN apt-get -y --force-yes install wget curl git unzip \
  g++ make nginx mysql-server mysql-client  

RUN apt-get install supervisor curl -y 

# ===================NODE INSTALL================== 
RUN apt-get update && apt-get install -y curl gnupg2 lsb-release && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - && \
    apt-key fingerprint 1655A0AB68576280 && \
    export VERSION=node_14.x && \
    export DISTRO="$(lsb_release -s -c)" && \
    echo "deb https://deb.nodesource.com/$VERSION $DISTRO main" | tee /etc/apt/sources.list.d/nodesource.list && \
    echo "deb-src https://deb.nodesource.com/$VERSION $DISTRO main" | tee -a /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && apt-get install -y nodejs && \
    node -v && npm -v && \
    npm install -g yarn && \
    yarn -v && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* 

#===================NODE INSTALL============= 

#Set working directory
WORKDIR /var/www 
# Copy existing application directory contents
# COPY ./ /var/www
ADD . /var/www
RUN cd /var/www
# Create env file
# RUN cp .env .env
RUN npm install 
# npm install rimraf --save-dev
# RUN npm rebuild node-sass
# RUN npm run dev
# RUN PORT=8080  node server.js 
#Copy supervisor configurations server file into the server
COPY conf/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
RUN true
#Copy config files 
COPY conf/nginx.conf /etc/nginx/nginx.conf
RUN true
COPY conf/nginx-site.conf /etc/nginx/sites-available/default.conf
RUN true 
RUN rm -rf /etc/nginx/sites-enabled/default 
RUN ln -s /etc/nginx/sites-available/default.conf /etc/nginx/sites-enabled/default.conf 

EXPOSE 443 80 3000

CMD ["/usr/bin/supervisord"]
# RUN npm start