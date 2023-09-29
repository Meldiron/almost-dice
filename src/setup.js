import { Client, Databases } from "node-appwrite";
import { throwIfMissing } from "./utils.js";

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
    await databases.create('main', 'main');
  } catch(_err) {}

  try {
    await databases.createCollection('main', 'wallets', 'wallets')
  } catch(_err) {}

  try {
    await databases.createFloatAttribute('main', 'wallets', 'balance', true);
  } catch(_err) {}

  console.log(`Setup script finished.`);
}

setup();
