#!/bin/sh

cd /vagrant/setup

yum update -y

# install Node.js
curl -L git.io/nodebrew | perl - setup
echo "export PATH=$HOME/.nodebrew/current/bin:$PATH" >> ~/.bash_profile
source ~/.bash_profile
nodebrew install-binary v5.3.0
nodebrew use v5.3.0
nodebrew alias default v5.3.0

# remove default MySQL
yum remove -y mysql

# stop apache
systemctl disable httpd
systemctl stop httpd

# install MariaDB
yum install -y mariadb-server
mv -f /etc/my.cnf.d/server.cnf /etc/my.cnf.d/server.cnf.bak
cp -f server.cnf /etc/my.cnf.d/server.cnf
systemctl enable mariadb.service
systemctl start mariadb.service

# create floatbehind user, database and tables
mysql -u root < init.sql
