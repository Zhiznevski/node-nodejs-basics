const parseEnv = () => {
  let res = "";
  for (const v in process.env) {
    if (!v.startsWith("RSS_")) continue;
    res += `${v}=${process.env[v]}; `;
  }

  console.log(res.trim().slice(0, -1));
};

parseEnv();
