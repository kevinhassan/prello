#!/bin/sh
if [ $# -gt 0 ]
then ROOTDIR=$1 && cd $ROOTDIR
fi
GIT=`which git`
EGREP= `which egrep`
WC=`which wc`
${GIT} add -a .
${GIT} commit -m "deploy react app #"
${GIT} push -f dokku master
echo "React app successfully deployed"