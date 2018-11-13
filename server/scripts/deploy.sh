#!/bin/sh
if [ $# -gt 0 ]
then ROOTDIR=$1 && cd $ROOTDIR
fi
GIT=`which git`
${GIT} add --all .
${GIT} commit -m "deploy"
${GIT} push dokku master
