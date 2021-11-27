curl -sS http://localhost:3000/snippets/5faf0b39-f32e-4e57-87fb-99499bfba7c0 \
	-H "Accept:application/json" \
	-H "Content-Type:application/json" \
	-d '{"code":"console.log(\"hello world!\")"}' \
	-X PUT

