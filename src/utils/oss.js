const qiniu = require("qiniu");
const SK = "IYXfrgdXSK60b93ancT9LHhopjQ8dsH7PP8ASNOF";
const AK = "1mWRcX8aukr70JbGuuVBEdYMFAT6g_hvGbaNEcXq";
const mac = new qiniu.auth.digest.Mac(AK, SK);

const options = {
  scope: "lpf-blob", //七牛云控制台添加的空间名称
  expires: 7200, // 有效期，默认有效期为1个小时。expires单位为秒
  returnBody:
    '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
};

const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);
const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z2;
// config.url = "http://cdn.bilibili.games";
config.url = "http://qiniu.kpaiedu.com";

const uploadFile = (key, file) => {
  const putExtra = new qiniu.form_up.PutExtra();
  const formUploader = new qiniu.form_up.FormUploader(config);

  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, file, putExtra, function (err, ret) {
      if (!err) {
        const response = {
          url: `${config.url}/${key}`,
        };
        resolve(response);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = {
  uploadFile,
};
