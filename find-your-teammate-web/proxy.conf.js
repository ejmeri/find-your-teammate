const API_URL = '';

const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: process.env.apiUrl || API_URL,
    secure: false, // true se for https
    logLevel: 'info', // info | debug | error
    // pathRewrite: { '^/api': '' }  // REESCREVENDO O CAMINHO
    changeOrigin: true
  },
];

module.exports = PROXY_CONFIG;