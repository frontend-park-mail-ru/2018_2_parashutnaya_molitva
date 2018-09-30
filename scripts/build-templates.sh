#!/bin/bash
if [ $# -ne 2 ]
  then
    echo "Usage: ./build-templates <compiler-script> <directory>"
    exit 1
fi
COMPILER=$1
DIRECTORY=$2
for i in $(find $DIRECTORY -iname "*.xml"); do
    XML_TEMPLATE=$i
    XML_DIRECTORY=$(dirname "${XML_TEMPLATE}")
    $COMPILER --dir=$XML_DIRECTORY
done
