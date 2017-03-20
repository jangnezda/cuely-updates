`NOTE`: Cuely was a startup idea that was part of [Founders](https://founders.as) incubator. Unfortunately, idea failed to gain traction, so it never went
past prototype/discovery phase. If you want to do anything with the code, use it or extend it, and need any help, then feel free to contact me [@jangnezda](https://twitter.com/@jangnezda) or open a Github issue.

# cuely-updates
Minimal server for Cuely app updates. Inspired by blog post on `http://electron.rocks/publishing-for-os-x/` and related repo `https://github.com/Vj3k0/ea-todo-server`.

## Development / local
Create a dir `updates/latest/osx` in the project and copy builds inside that dir. Then run with `npm run dev`. To get the update json: `curl -v http://localhost:5123/updates/latest/v=x.y.z
