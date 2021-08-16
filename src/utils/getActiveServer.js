const jsonFile = require('./config.json');

function getActiveServerByEnvMode() {
  return jsonFile.find(s =>
    process.env.ENV_MODE === "prod"
      ? s.server_name === "Codando"
      : s.server_name === "Teste Cody"
  );
}

function getActiveServerByServerName(serverName) {
  return jsonFile.find(s => s.server_name === serverName);
}

function getActiveServerByServerID(serverID) {
  return jsonFile.find(s => s.server_id === serverID);
}

module.exports = {
  getActiveServerByEnvMode,
  getActiveServerByServerName,
  getActiveServerByServerID
};
