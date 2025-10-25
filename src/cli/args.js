const parseArgs = () => {
  const map = {};
  const args = process.argv;
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      const key = args[i].slice(2);
      map[key] = args[i + 1];
    }
  }
  let res = "";
  for (const key in map) {
    res += `${key} is ${map[key]}, `;
  }

  console.log(res.trim().slice(0, -2));
};

parseArgs();
