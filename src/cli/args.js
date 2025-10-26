const parseArgs = () => {
  const args = process.argv.slice(2);

  const res = args.reduce((acc, curr, index, arr) => {
    if (curr.startsWith("--")) {
      return acc + `${curr.slice(2)} is ${arr[index + 1]}` + ", ";
    }
    return acc;
  }, "");

  console.log(res.slice(0, -2));
};

parseArgs();
