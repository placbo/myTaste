
#replace app version
sed -i '/REACT_APP_VERSION/d' ./.env
echo "REACT_APP_VERSION=$(date +"%d-%m-%Y %T")" >> .env

# deploy to nginx
npm run build
sudo rm -rf /var/www/html/mytaste/
sudo mv build /var/www/html/mytaste/
