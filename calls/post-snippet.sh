curl -sS http://localhost:3000/snippets\
	-H "Accept:application/json" \
	-H "Content-Type:application/json" \
	-d '{"title":"lua hello world","code":"print(\"Hello world!\");", "language":"lua"}' \
	-X POST
