const { Client, Databases } = require("node-appwrite");

function throwIfMissing(obj, keys) {
  const missing = [];
  for (let key of keys) {
    if (!(key in obj) || !obj[key]) {
      missing.push(key);
    }
  }
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(", ")}`);
  }
}

async function setup() {
  throwIfMissing(process.env, ["APPWRITE_API_KEY"]);

  console.log("Executing setup script...");

  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const databases = new Databases(client);

  // Setup Wallets
  try {
    await databases.create("main", "main");
  } catch (_err) {}

  try {
    await databases.createCollection("main", "wallets", "wallets");
  } catch (_err) {}

  try {
    await databases.createFloatAttribute("main", "wallets", "balance", true);
  } catch (_err) {}

  console.log(`Setup script finished.`);
}

setup();
