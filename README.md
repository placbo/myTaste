#Frontend for myTaste

Applikation created with Create React App

Run: 

    npm start

or
 
    sudo sh deploy.sh

Environment setup
-

.env :

    REACT_APP_MYTASTE_API_HOST=http://localhost:3001/mytasteapi
    REACT_APP_MYTASTE_CONTENT_HOST=http://localhost/mytastecontent
    REACT_APP_MOCK_API=true
    REACT_APP_VERSION=xxx

.env.production

    REACT_APP_MYTASTE_API_HOST=/mytasteapi
    REACT_APP_MYTASTE_CONTENT_HOST=/mytastecontent
    REACT_APP_MOCK_API=false
    REACT_APP_VERSION=xxx

Filesystem
-
    mkdir /var/www/html/mytastecontent/

NGINX setup
-

/etc/nginx/conf.d/myserver.conf:

    server {
      listen 80;
      server_name kasselars.com;
    
      root /var/www/html/mytaste;
      try_files $uri $uri/ /index.html;
    
      location /mytastecontent/ {
        alias /var/www/html/mytastecontent/;
      }
    
      location /api/ {
        proxy_pass http://127.0.0.1:8080/personrelasjonapi/;
      }
    
      location /mytasteapi/ {
        proxy_pass http://127.0.0.1:3001/mytasteapi/;
      }
    
      location /webtest/ {
        proxy_pass http://127.0.0.1:3002/;
        proxy_set_header Host $host;
      }
    
      location /apitest/ {
        proxy_pass http://127.0.0.1:3003/;
        proxy_set_header Host $host;
      }
    }



serve gui with surge:
--------------------
sudo npm i -g surge
surge
project path: /path/to/project/build
mytaste.surge.sh
