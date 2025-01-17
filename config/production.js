module.exports = {
  log: {
    level: "info",
    disabled: false,
  },
  port: 9000,

  cors: {
    origins: ["https://sdp2-a01.hogenttiproject.be"],
    maxAge: 3 * 60 * 60,
  },

  database: {
    client: "mysql2",
    host: "vichogent.be",
    port: 40058,
    name: "SDP2DBA01",
  },
};
