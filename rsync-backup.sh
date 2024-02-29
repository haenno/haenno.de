#!/bin/sh

# add to roots crontab: sudo crontab -e
# 0 3 * * * root bash /home/haenno/haenno.de/rsync-backup.sh     # the script file is running every day at 03:00

/usr/bin/rsync -avz --delete /etc /mnt/exthdd/sharedir/Raspi-Backup --log-file=/var/log/rsync-daily-backup-etc.log
/usr/bin/rsync -avz --delete /var/log /mnt/exthdd/sharedir/Raspi-Backup --log-file=/var/log/rsync-daily-backup-log.log 
/usr/bin/rsync -avz --delete /home/haenno /mnt/exthdd/sharedir/Raspi-Backup --log-file=/var/log/rsync-daily-backup-haenno.log 
