# 🦭 SealShare: Secure Secret Sealing & Sharing

SealShare is a lightweight app for securely sealing and sharing sensitive information through encrypted links. Built with **Next.js** and **TypeScript**, and powered by [Unkey's API](https://www.unkey.com/docs/api-reference/overview), SealShare ensures your secrets are protected without the need for a database. It generates a time-limited URL, allowing temporary access to encrypted data across platforms.

SealShare offers secure, temporary access without storing any sensitive information or tracking users. For additional security, sensitive context like passwords can be shared through separate channels.

## Features & Benefits:

- **End-to-End Encryption:**\
  All secrets are encrypted client-side, ensuring that even SealShare cannot access the information being shared.
- **Self desctruction:**\
  Encrypted messages have a fixed lifetime and will be deleted automatically after expiration.
- **No Database Required:**\
  Lightweight design powered by Next.js and Unkey, eliminating the need for storing secrets in a database.
- **One-Time Access:**\
  Option to generate links that can only be accessed once, ensuring that the secret is unrecoverable after being viewed.
- **No accounts needed:**\
  Sharing should be quick and easy. No additional information except the encrypted secret is stored in the app.

## Use Cases:

- **Password or Key Distribution:**\
  Send sensitive passwords, API keys, or credentials to authorized recipients without fear of interception or long-term exposure.
- **Temporary Project Collaboration:**\
  Collaborate on sensitive project materials by granting team members secure, short-term access to key resources.
- **Personal Information Transfer:**\
  Share personal information (e.g., social security numbers, personal IDs) securely.
- **Developer API Sharing:**\
  Distribute API keys to developers for limited-time use, ideal for time-bound access to private APIs or testing environments.

## Quickstart Guide

### Create a Unkey Root Key

1. Navigate to [Unkey Root Keys](https://app.unkey.com/settings/root-key) and click **"Create New Root Key"**.
2. Name your root key.
3. Select the following workspace permissions:
   - `create_key`
   - `read_key`
   - `encrypt_key`
   - `decrypt_key`
4. Click **"Create"** and save your root key securely.

### Create a Unkey API

1. Go to [Unkey APIs](https://app.unkey.com/apis) and click **"Create New API"**.
2. Enter a name for the API.
3. Click **"Create"**.

### Run the example locally

1. Clone the repository to your local machine:

   ```bash
   git clone git@github.com:unrenamed/sealshare
   cd sealshare
   ```

2. Create a `.env` file in the root directory and populate it with the following environment variables:

   ```env
   UNKEY_ROOT_KEY=your-unkey-root-key
   UNKEY_API_ID=your-unkey-api-id
   ```

   Ensure you replace `your-unkey-*` with your actual Unkey credentials.

3. Start the server:

   ```bashF
   pnpm dev
   ```

   The server will start and listen on the `3000` port.
