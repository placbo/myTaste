# Server for mytaste

Bruker mongodb

kjør 
    
    mongo

ENVIRONMENTS
-
.env

    PORT=3001
    GOOGLE_CLIENT_ID=XXXXXXXXXXXXXX
    GOOGLE_CLIENT_SECRET=XXXXXXXXXXXXX
    SESSION_SECRET=XXXXXXXXXXXX
    CLIENT_HOST=
    SERVER_HOST=http://localhost
    IMAGE_LOCATION=/var/www/html/mytastecontent/
    IMAGE_THUMB_LOCATION=/var/www/html/mytastecontent/thumb/
    MONGODB_URI=mongodb://localhost:27017/mytaste
    ITEMS_COLLECTION_NAME=items
    USERS_COLLECTION_NAME=users


Kjør server og klient på hver sin port

    CLIENT_HOST=http://localhost:3000
    SERVER_HOST=http://localhost:3001

Kjør klient og server via nginx (kjøres fra lokal maskin)

    CLIENT_HOST=
    SERVER_HOST=http://localhost

Kjør klient og server via nginx (kjøres ekternt med domene-binding)

    CLIENT_HOST=
    SERVER_HOST=http://www.kasselars.com


Backup 
-

`sh backup.sh`

(Forutsetter oppsett med: ssh-copy-id USER@SERVER)

Kan restores med med mongorestore (sjekk dok)

TODO: cron
TODO: test også :
mongoexport --collection=items --db=mytaste --out=items.json kan også brukes



