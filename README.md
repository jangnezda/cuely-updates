# cuely-updates
Minimal server for Cuely app updates. Inspired by blog post on `http://electron.rocks/publishing-for-os-x/` and related repo `https://github.com/Vj3k0/ea-todo-server`.

## Development / local
Create a dir `updates/latest/osx` in the project and copy builds inside that dir. Then run with `npm run dev`. To get the update json: `curl -v http://localhost:5123/updates/latest/v=x.y.z`
