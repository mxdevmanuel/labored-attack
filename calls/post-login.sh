curl -fsS -X POST \
	-H "Content-Type:application/json" \
	-H "Accept:application/json" \
	-d '{"username":"john","password":"changeme"}' \
	http://localhost:3000/auth/login

