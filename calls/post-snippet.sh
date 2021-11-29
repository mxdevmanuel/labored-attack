response=`curl -fsS -X POST \
	-H "Content-Type:application/json" \
	-H "Accept:application/json" \
	-d '{"username":"john","password":"changeme"}' \
	http://localhost:3000/auth/login`

token=$(echo $response | jq '.access_token' | tr -d '"')

curl -sS http://localhost:3000/snippets\
	-H "Accept:application/json" \
	-H "Content-Type:application/json" \
	-H "Authorization: Bearer $token" \
	-d '{"title":"lua hello world","code":"print(\"Hello world!\");", "language":"lua"}' \
	-X POST
