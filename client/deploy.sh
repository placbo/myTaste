
#replace app version
sed -i '/REACT_APP_VERSION/d' ./.env
echo "REACT_APP_VERSION=$(date +"%d-%m-%Y %T")" >> .env

