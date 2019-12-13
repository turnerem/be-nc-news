#!/bin

pw=`cat linux_password.txt`
un=`cat linux_username.txt`
echo $pw
git add .
git commit -m "$1"
git push origin master
