
#replace app version
cd client
sed -i '/REACT_APP_VERSION/d' ./.env
echo "REACT_APP_VERSION=$(date +"%d-%m-%Y %T")" >> .env

# deploy to nginx
npm run build

# forutsetter oppsett med: ssh-copy-id USER@SERVER
ssh pcb@gunnar "rm -rf /var/www/html/mytaste/*"
scp -r ./build/* pcb@gunnar:/var/www/html/mytaste/


