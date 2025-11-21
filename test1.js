const crypto = require("crypto");

function generateSmsRetrieverHash(packageName, signatureString) {
  const appInfo = `${packageName} ${signatureString}`;

  const hashFull = crypto.createHash("sha256").update(appInfo, "utf8").digest();
  const hash9 = hashFull.slice(0, 9);
  const base64Hash = hash9.toString("base64").replace(/=+$/, "");
  return base64Hash.substring(0, 11);
}

const packageName = "com.pinnaclevastu";
const signingCert = "FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C";

console.log(generateSmsRetrieverHash(packageName, signingCert));
