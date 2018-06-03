sudo mv src/data/dist/*.deb /var/www/repo/debs/
cd /var/wwww/repo/
git add .
git commit -m "something"
git push
./run.sh
exit