response=$(sh $(dirname ${0})/post-login.sh)

token=$(echo $response | jq '.access_token' | tr -d '"')

curl -sS http://localhost:3000/snippets/b9b2e3cb-a812-40d0-8931-c44e6a1ab198 \
	-H "Accept:application/json" \
	-H "Content-Type:application/json" \
	-H "Authorization: Bearer $token" \
	-X DELETE

