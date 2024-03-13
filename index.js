// 引入ssh2库
const { Client } = require('ssh2');

class SftpClient {
  constructor(config) {
    this.config = config;
    this.conn = new Client();
  }

  // 连接SFTP服务器
  connect() {
    return new Promise((resolve, reject) => {
      this.conn.on('ready', () => {
        this.conn.sftp((err, sftp) => {
          if (err) reject(err);
          this.sftp = sftp;
          resolve();
        });
      }).on('error', (err) => {
        reject(err);
      }).connect(this.config);
    });
  }

  // 列出目录下的文件
  list(directory = '.') {
    return new Promise((resolve, reject) => {
      this.sftp.readdir(directory, (err, list) => {
        if (err) reject(err);
        resolve(list);
      });
    });
  }

  // 关闭连接
  close() {
    this.conn.end();
  }
}

module.exports = SftpClient;

