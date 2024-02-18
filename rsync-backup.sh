#!/bin/sh

# add to roots crontab: sudo crontab -e
# 0 3 * * * root bash /home/haenno/haenno.de/rsync-backup.sh     # the script file is running every day at 03:00

/usr/bin/rsync -avz --delete /etc /mnt/exthddbakup/sharedir/rsync-daily-backup --log-file=/var/log/rsync-daily-backup-etc.log
#/usr/bin/rsync -avz --delete --exclude /var/log/journal /var/log /mnt/exthddbakup/sharedir/rsync-daily-backup --log-file=/var/log/rsync-daily-backup-log.log 
/usr/bin/rsync -avz --delete /home/haenno /mnt/exthddbakup/sharedir/rsync-daily-backup --log-file=/var/log/rsync-daily-backup-haenno.log 
/usr/bin/rsync -avz --delete /mnt/exthdd/sharedir /mnt/exthddbakup/sharedir/rsync-daily-backup --log-file=/var/log/rsync-daily-backup-exthdd.log 
