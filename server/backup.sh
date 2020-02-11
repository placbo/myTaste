#!/bin/bash

rm -rf dump/
mongodump

CURRENTDATE=`date +"%Y%m%d-%H%M"`

#todo: pakk ned filene med rsync
tar -zcvf archive$CURRENTDATE.tar.gz  /var/www/html/mytastecontent dump

# forutsetter oppsett med: ssh-copy-id USER@SERVER
rsync -v --remove-source-files -e ssh archive$CURRENTDATE.tar.gz pcb@Gunnar:~/backupFraBjarne

rm -rf dump/

#slett unna alt alt eldre enn de 7 siste
#rm -rf $(ls -1t | tail -n +8)