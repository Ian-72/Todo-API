# Todo-API

Todo-API ini dibuat dengan Node JS, RDBMS MYSQL, dan Docker Container.

Karena waktunya nyrepek dan saya baru belajar ORM jadi ya ...  :

Thanks to : 
- Hapi Js 
- Sequelize

Link [Dokumentasi](https://documenter.getpostman.com/view/7918444/UVJhEabr)


## Cara Penggunaan

**Pull docker image :**

    docker run -e MYSQL_HOST={mysql_host_local_anda} -e MYSQL_USER={user_mysql_local} -e MYSQL_PASSWORD={pass_user_mysql_local} -e MYSQL_DBNAME={nama_database_anda} -p 8090:3030 rstwll/devcode-challenge-app

**Test manual** 
Dengan Postman  https://localhost:8090

**Automation testing**

    docker run -e API_URL=http://host.docker.internal:3000 monsterup/devcode-unit-test-1

## Hasil Challenge
Link [Leaderboard](https://devcode.gethired.id/leaderboard/4)

