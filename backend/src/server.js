const dns = require("node:dns");
const { PORT, MONGODB_URI, CLIENT_ORIGIN } = require("./config/env");
const { connectDB } = require("./config/db");
const { createApp } = require("./app");

async function main() {
  // Helpful on some networks where SRV/IPv6 resolution is flaky.
  // Set via env if needed:
  // - DNS_RESULT_ORDER=ipv4first
  // - DNS_SERVERS=8.8.8.8,1.1.1.1
  if (process.env.DNS_RESULT_ORDER) {
    dns.setDefaultResultOrder(process.env.DNS_RESULT_ORDER);
  } else {
    dns.setDefaultResultOrder("ipv4first");
  }

  if (process.env.DNS_SERVERS) {
    const servers = process.env.DNS_SERVERS.split(",").map((s) => s.trim()).filter(Boolean);
    if (servers.length) dns.setServers(servers);
  }

  await connectDB(MONGODB_URI);
  const app = createApp();

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${PORT}`);
    // eslint-disable-next-line no-console
    console.log(`CORS origin: ${CLIENT_ORIGIN}`);
  });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

