const fs = require("fs");
const crypto = require("crypto");

const buildDirectoryTree = (files, rename, originName) => {
  const root = {};

  files.forEach((file) => {
    const parts = file.path.split("/");
    let current = root;

    parts.forEach((part, index) => {
      if (part === "") {
        //跳过空字符串
        return;
      }

      if (rename && part === originName) {
        part = rename;
      }

      if (!current[part]) {
        current[part] = {
          type: index === parts.length - 1 ? file.type : "Folder",
          path: rename ? file.path.replaceAll(originName, rename) : file.path,
          children: {},
        };
      }
      current = current[part].children;
    });
  });

  const convertToTree = (node) => {
    const result = [];
    for (const key in node) {
      const item = node[key];
      if (item.type === "Folder") {
        result.push({
          title: key,
          type: item.type,
          isLeaf: item.type !== "Folder",
          key: item.path,
          disabled: true,
          children: convertToTree(item.children),
        });
      } else {
        if (item.path.endsWith(".exe") || item.path.endsWith(".html")) {
          console.log(123);
          result.push({
            title: key,
            type: item.type,
            isLeaf: item.type !== "Folder",
            key: item.path,
            children: convertToTree(item.children),
          });
        }
      }
      // result.push({
      //   title: key,
      //   type: item.type,
      //   isLeaf: item.type !== "Folder",
      //   key: item.path,
      //   disabled: !item.path.endsWith(".exe") || !item.path.endsWith(".html"),
      //   children: convertToTree(item.children),
      // });
    }
    return result;
  };

  return convertToTree(root);
};

const calculateFileHash = (file) => {
  const hash = crypto.createHash("md5");
  if (typeof file === "string") {
    hash.update(fs.readFileSync(file));
  } else {
    hash.update(fs.readFileSync(file.path));
  }
  return hash.digest("hex");
};

module.exports = {
  buildDirectoryTree,
  calculateFileHash,
};
