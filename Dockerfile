FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY sites /usr/share/nginx/html
COPY config/sites.conf /etc/nginx/conf.d/