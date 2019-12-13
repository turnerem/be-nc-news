#!/bin

pw=`linux_password.txt`
un=`linux_username.txt`
echo $pw
git add .
git commit -m "$1"
git push origin master
