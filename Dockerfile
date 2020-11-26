ARG REACT_APP_GOOGLE_LOGIN_CLIENT_ID
ARG REACT_APP_FACEBOOK_LOGIN_APP_ID
ARG REACT_APP_BASE_URL_API_LINK

# stage1 - build react app first
FROM node:12.16.1-alpine3.9 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_GOOGLE_LOGIN_CLIENT_ID=$REACT_APP_GOOGLE_LOGIN_CLIENT_ID
ENV REACT_APP_FACEBOOK_LOGIN_APP_ID=$REACT_APP_FACEBOOK_LOGIN_APP_ID
ENV REACT_APP_BASE_URL_API_LINK=$REACT_APP_BASE_URL_API_LINK
COPY ./package.json /app/
RUN npm install
COPY . /app
RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.17.8-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]