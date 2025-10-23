# OpenD NFT Marketplace - Setup & Run Instructions

## Prerequisites
- **DFX (Internet Computer SDK)** - Install from https://internetcomputer.org/docs/current/developer-docs/setup/install/
- **Node.js** (v14 or later) - Install from https://nodejs.org/
- **npm** (comes with Node.js)

## Step-by-Step Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Internet Computer Network
Open a terminal and run:
```bash
dfx start --clean
```
**Note:** Keep this terminal running. The `--clean` flag starts a fresh local network.

### 3. Deploy Canisters
Open a **new terminal** in the project directory and run:

#### Deploy all canisters
```bash
dfx deploy
```

This will deploy:
- **opend** - The main marketplace canister
- **nft** - NFT canister template
- **token** - DANG token canister
- **opend_assets** - Frontend assets

### 4. Get Token Canister ID (Important!)
After deployment, get the token canister ID:
```bash
dfx canister id token
```

Copy the output (e.g., `rrkah-fqaaa-aaaaa-aaaaq-cai`)

### 5. Update Token Canister ID in Code
Open `src/opend_assets/src/components/Item.jsx` and find line 118:
```javascript
canisterId: Principal.fromText("<REPLACE WITH YOUR TOKEN CANISTER ID>"),
```

Replace the placeholder with your token canister ID:
```javascript
canisterId: Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai"),
```

### 6. Start Development Server
```bash
npm start
```

### 7. Access the Application
Open your browser and navigate to:
```
http://localhost:8080/
```

## Testing the Application

### Mint an NFT
1. Navigate to the **Minter** page
2. Upload an image
3. Enter a collection name
4. Click "Mint NFT"

### List an NFT for Sale
1. Navigate to **My NFTs**
2. Click on an NFT you own
3. Click **Sell**
4. Enter a price in DANG
5. Click **Confirm**

### Buy an NFT
1. Navigate to **Discover**
2. Find a listed NFT
3. Click **Buy**

## Common Issues & Solutions

### Port Already in Use
If port 8080 is already in use, you can change it in `dfx.json`:
```json
"bind": "127.0.0.1:8001"
```

### Canisters Not Found
Make sure `dfx start` is running in a separate terminal.

### Agent Fetch Root Key Warning
The line `agent.fetchRootKey()` in Item.jsx is only for local development. 
**Remove this line before deploying to production!**

## Advanced Testing (via Command Line)

### Mint an NFT via CLI
```bash
dfx canister call opend mint '(vec {137; 80; 78; 71; 13; 10; 26; 10; 0; 0; 0; 13; 73; 72; 68; 82; 0; 0; 0; 10; 0; 0; 0; 10; 8; 6; 0; 0; 0; 141; 50; 207; 189; 0; 0; 0; 1; 115; 82; 71; 66; 0; 174; 206; 28; 233; 0; 0; 0; 68; 101; 88; 73; 102; 77; 77; 0; 42; 0; 0; 0; 8; 0; 1; 135; 105; 0; 4; 0; 0; 0; 1; 0; 0; 0; 26; 0; 0; 0; 0; 0; 3; 160; 1; 0; 3; 0; 0; 0; 1; 0; 1; 0; 0; 160; 2; 0; 4; 0; 0; 0; 1; 0; 0; 0; 10; 160; 3; 0; 4; 0; 0; 0; 1; 0; 0; 0; 10; 0; 0; 0; 0; 59; 120; 184; 245; 0; 0; 0; 113; 73; 68; 65; 84; 24; 25; 133; 143; 203; 13; 128; 48; 12; 67; 147; 94; 97; 30; 24; 0; 198; 134; 1; 96; 30; 56; 151; 56; 212; 85; 68; 17; 88; 106; 243; 241; 235; 39; 42; 183; 114; 137; 12; 106; 73; 236; 105; 98; 227; 152; 6; 193; 42; 114; 40; 214; 126; 50; 52; 8; 74; 183; 108; 158; 159; 243; 40; 253; 186; 75; 122; 131; 64; 0; 160; 192; 168; 109; 241; 47; 244; 154; 152; 112; 237; 159; 252; 105; 64; 95; 48; 61; 12; 3; 61; 167; 244; 38; 33; 43; 148; 96; 3; 71; 8; 102; 4; 43; 140; 164; 168; 250; 23; 219; 242; 38; 84; 91; 18; 112; 63; 0; 0; 0; 0; 73; 69; 78; 68; 174; 66; 96; 130;}, "CryptoDunks #123")'
```

### Get NFT Canister ID from output
The command above returns a Principal ID. Copy it for the next commands.

### List an NFT
```bash
dfx canister call opend listItem '(principal "<NFT_CANISTER_ID>", 2)'
```

### Transfer NFT to OpenD
First, get the OpenD canister ID:
```bash
dfx canister id opend
```

Then transfer:
```bash
dfx canister call <NFT_CANISTER_ID> transferOwnership '(principal "<OPEND_CANISTER_ID>", true)'
```

## Project Structure
```
final opend/
├── src/
│   ├── NFT/              # NFT canister code
│   ├── opend/            # Main marketplace canister
│   ├── token/            # DANG token canister
│   ├── declarations/     # Auto-generated canister interfaces
│   └── opend_assets/     # React frontend
├── dfx.json              # DFX configuration
├── package.json          # Node dependencies
└── webpack.config.js     # Webpack configuration
```

## Troubleshooting

### "Cannot find module" errors
```bash
npm install
```

### Webpack errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### DFX errors
```bash
dfx stop
dfx start --clean
dfx deploy
```

## Production Deployment

Before deploying to the Internet Computer mainnet:
1. Remove `agent.fetchRootKey()` from `Item.jsx` (line 30)
2. Update the localhost URL to use window.location.origin
3. Run `dfx deploy --network ic`s

## Support
- Internet Computer Documentation: https://internetcomputer.org/docs
- DFX Documentation: https://internetcomputer.org/docs/current/references/cli-reference/
