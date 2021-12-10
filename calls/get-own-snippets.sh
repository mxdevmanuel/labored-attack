response=$(sh $(dirname ${0})/post-login.sh)

token=$(echo $response | jq '.access_token' | tr -d '"')

curl -sS http://localhost:3000/snippets/mine \
	-H "Accept:application/json" \
	-H "Content-Type:application/json" \
	-H "Authorization: Bearer $token"
