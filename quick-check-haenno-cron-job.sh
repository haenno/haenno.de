#!/bin/bash
# quick script to update the server, install in cron with crontab -e and add the following line:
# */5 * * * * /-your-path-to-this-script-/quick-check-haenno-cron-job.sh >> /var/log/quick-check-haenno-cron-job.log 2>&1
# it checks if the remote git repo is newer than the local one and if so, it pulls the changes and restarts the containers

HAENNO_SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
cd $HAENNO_SCRIPT_DIR
now=$(date "+%F %H:%M:%S")
echo "$now --> Remote git repo quick check haenno.de > Starting..."
git -C $HAENNO_SCRIPT_DIR fetch origin
if [ $(git -C $HAENNO_SCRIPT_DIR rev-list HEAD...origin/main --count) != 0 ]; then
    echo "$now --> Remote git repo quick check haenno.de > Remote is newer > Start update..."

    git -C $HAENNO_SCRIPT_DIR reset --hard origin/main
    git -C $HAENNO_SCRIPT_DIR pull
    sudo chmod +x $HAENNO_SCRIPT_DIR/*.sh

    sudo docker-compose -p $HAENNO_SCRIPT_DIR stop
    sudo docker-compose -p $HAENNO_SCRIPT_DIR build
    sudo docker-compose -p $HAENNO_SCRIPT_DIR up -d

    echo "$now --> Remote git repo quick check haenno.de > Update done!"

else
    echo "$now --> Remote git repo quick check haenno.de > Remote is same as local > Nothing to do!"
fi
echo "$now --> Remote git repo quick check haenno.de > Finished!"
