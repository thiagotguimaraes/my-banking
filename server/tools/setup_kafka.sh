
sudo docker-compose -f './docker-compose.yml' down -v

sudo systemctl restart docker

sudo docker ps

sudo docker-compose -f './docker-compose.yml' up -d --build

sudo docker logs kafka
sudo docker logs zookeeper