#!/bin/sh
reset 
cd ..
APPDIR=$PWD
if [ $# -gt 1 ]
then APPDIR=$1 && cd $APPDIR
fi
echo "======================="
echo "PRELLO APP DEPLOYEMENT"
echo "======================="
echo ""
echo ""
echo "Deploying Node api"
echo "----------------------"
$APPDIR/server/scripts/deploy.sh $APPDIR/server
echo ""
echo ""
echo "Deploying React app"
echo "----------------------"
#$APPDIR/client/scripts/deploy.sh $APPDIR/client
echo ""
echo ""
echo "======================="
echo "DEPLOYEMENT DONE"
echo "======================="
