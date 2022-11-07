docker run -d -p 5555:80 -e PGADMIN_DEFAULT_EMAIL=test@test.com -e PGADMIN_DEFAULT_PASSWORD=test --network deftly-august_default --name pgadmin dpage/pgadmin4


printf "\npg admin running on http://localhost:5555"
printf "\nPG admin email: test@test.com"
printf "\nPG admin password: test"