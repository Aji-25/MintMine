# MintMine 🎨

A decentralized NFT marketplace built on the Internet Computer blockchain. Create, buy, and sell NFTs using MAJI tokens in a secure, fully on-chain environment.

## 🌟 Features

- **Mint NFTs**: Create unique NFTs with custom images and names
- **NFT Marketplace**: Browse and discover NFTs listed for sale
- **Buy & Sell**: Trade NFTs using MAJI tokens
- **Personal Collection**: Manage your owned NFTs
- **Fully On-Chain**: All data stored on the Internet Computer blockchain
- **Decentralized**: No central authority or database

## 🏗️ Architecture

MintMine consists of four main canisters:

### Backend Canisters (Motoko)

1. **mintmine** - Core marketplace logic
   - NFT listing and delisting
   - Purchase management
   - Owner tracking
   - Price management

2. **nft** - NFT smart contract
   - Individual NFT data and metadata
   - Ownership management
   - Asset storage

3. **token** - MAJI token implementation
   - Token transfers
   - Balance management
   - Transaction handling

### Frontend

4. **mintmine_assets** - React-based web interface
   - Modern, responsive UI
   - Seamless Web3 integration
   - Real-time NFT display

## 🚀 Getting Started

### Prerequisites

- [DFX SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install/) (v0.9.3 or higher)
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**
   ```bash
   cd /path/to/your/project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the local Internet Computer replica**
   ```bash
   dfx start --background --clean
   ```

4. **Deploy the canisters**
   ```bash
   dfx deploy --argument='("CryptoDunks #123", principal "ilm6f-vuzsc-e5aqk-7yrpv-hpujz-fmxx6-u7l6f-ivupi-md7gn-re4if-uae", (vec {137; 80; 78; 71; 13; 10; 26; 10; 0; 0; 0; 13; 73; 72; 68; 82; 0; 0; 0; 10; 0; 0; 0; 10; 8; 6; 0; 0; 0; 141; 50; 207; 189; 0; 0; 0; 1; 115; 82; 71; 66; 0; 174; 206; 28; 233; 0; 0; 0; 68; 101; 88; 73; 102; 77; 77; 0; 42; 0; 0; 0; 8; 0; 1; 135; 105; 0; 4; 0; 0; 0; 1; 0; 0; 0; 26; 0; 0; 0; 0; 0; 3; 160; 1; 0; 3; 0; 0; 0; 1; 0; 1; 0; 0; 160; 2; 0; 4; 0; 0; 0; 1; 0; 0; 0; 10; 160; 3; 0; 4; 0; 0; 0; 1; 0; 0; 0; 10; 0; 0; 0; 0; 59; 120; 184; 245; 0; 0; 0; 113; 73; 68; 65; 84; 24; 25; 133; 143; 203; 13; 128; 48; 12; 67; 147; 94; 97; 30; 24; 0; 198; 134; 1; 96; 30; 56; 151; 56; 212; 85; 68; 17; 88; 106; 243; 241; 235; 39; 42; 183; 114; 137; 12; 106; 73; 236; 105; 98; 227; 152; 6; 193; 42; 114; 40; 214; 126; 50; 52; 8; 74; 183; 108; 158; 159; 243; 40; 253; 186; 75; 122; 131; 64; 0; 160; 192; 168; 109; 241; 47; 244; 154; 152; 112; 237; 159; 252; 105; 64; 95; 48; 61; 12; 3; 61; 167; 244; 38; 33; 43; 148; 96; 3; 71; 8; 102; 4; 43; 140; 164; 168; 250; 23; 219; 242; 38; 84; 91; 18; 112; 63; 0; 0; 0; 0; 73; 69; 78; 68; 174; 66; 96; 130;}))'
   ```

5. **Access the application**
   - Open your browser and navigate to the URL shown in the deployment output
   - Typically: `http://127.0.0.1:8000/?canisterId=<canister-id>`

## 💻 Development

### Project Structure

```
├── src/
│   ├── mintmine/           # Main marketplace canister
│   │   └── main.mo
│   ├── NFT/                # NFT canister
│   │   └── nft.mo
│   ├── token/              # MAJI token canister
│   │   └── main.mo
│   └── mintmine_assets/    # Frontend
│       ├── src/
│       │   ├── components/ # React components
│       │   │   ├── App.jsx
│       │   │   ├── Item.jsx
│       │   │   ├── Minter.jsx
│       │   │   ├── CollectionPage.jsx
│       │   │   ├── DiscoverPage.jsx
│       │   │   └── ...
│       │   └── index.jsx
│       └── assets/         # Static assets
├── dfx.json                # DFX configuration
├── package.json            # Node dependencies
└── webpack.config.js       # Webpack configuration
```

### Available Scripts

- **`npm start`** - Start development server
- **`npm run build`** - Build for production
- **`dfx deploy`** - Deploy all canisters
- **`dfx canister call <canister> <method>`** - Call canister methods

### Key Commands

```bash
# Start local replica
dfx start --background

# Deploy all canisters
dfx deploy

# Deploy specific canister
dfx deploy --argument='("CryptoDunks #123", principal "ilm6f-vuzsc-e5aqk-7yrpv-hpujz-fmxx6-u7l6f-ivupi-md7gn-re4if-uae", (vec {137; 80; 78; 71; 13; 10; 26; 10; 0; 0; 0; 13; 73; 72; 68; 82; 0; 0; 0; 10; 0; 0; 0; 10; 8; 6; 0; 0; 0; 141; 50; 207; 189; 0; 0; 0; 1; 115; 82; 71; 66; 0; 174; 206; 28; 233; 0; 0; 0; 68; 101; 88; 73; 102; 77; 77; 0; 42; 0; 0; 0; 8; 0; 1; 135; 105; 0; 4; 0; 0; 0; 1; 0; 0; 0; 26; 0; 0; 0; 0; 0; 3; 160; 1; 0; 3; 0; 0; 0; 1; 0; 1; 0; 0; 160; 2; 0; 4; 0; 0; 0; 1; 0; 0; 0; 10; 160; 3; 0; 4; 0; 0; 0; 1; 0; 0; 0; 10; 0; 0; 0; 0; 59; 120; 184; 245; 0; 0; 0; 113; 73; 68; 65; 84; 24; 25; 133; 143; 203; 13; 128; 48; 12; 67; 147; 94; 97; 30; 24; 0; 198; 134; 1; 96; 30; 56; 151; 56; 212; 85; 68; 17; 88; 106; 243; 241; 235; 39; 42; 183; 114; 137; 12; 106; 73; 236; 105; 98; 227; 152; 6; 193; 42; 114; 40; 214; 126; 50; 52; 8; 74; 183; 108; 158; 159; 243; 40; 253; 186; 75; 122; 131; 64; 0; 160; 192; 168; 109; 241; 47; 244; 154; 152; 112; 237; 159; 252; 105; 64; 95; 48; 61; 12; 3; 61; 167; 244; 38; 33; 43; 148; 96; 3; 71; 8; 102; 4; 43; 140; 164; 168; 250; 23; 219; 242; 38; 84; 91; 18; 112; 63; 0; 0; 0; 0; 73; 69; 78; 68; 174; 66; 96; 130;}))'

# Check canister status
dfx canister status mintmine

# Get canister ID
dfx canister id mintmine

# Stop local replica
dfx stop
```

## 🎮 Usage

### Minting an NFT

1. Navigate to the "Minter" page
2. Upload an image (PNG, JPEG, GIF, SVG, or WebP)
3. Enter a name for your NFT collection
4. Click "Mint NFT"
5. Wait for the transaction to complete

### Listing an NFT for Sale

1. Go to "My Collection"
2. Find the NFT you want to sell
3. Click "Sell"
4. Enter the price in MAJI tokens
5. Click "Confirm"
6. The NFT will appear in the "Discover" page

### Buying an NFT

1. Browse the "Discover" page
2. Find an NFT you want to purchase
3. Click "Buy"
4. Confirm the transaction
5. The NFT will be transferred to your collection

## 🔧 Configuration

### Updating User ID

The default user ID is set in `src/mintmine_assets/src/index.jsx`:

```javascript
const CURRENT_USER_ID = Principal.fromText("2vxsx-fae");
```

### Token Canister ID

Update the token canister ID in `src/mintmine_assets/src/components/Item.jsx`:

```javascript
canisterId: Principal.fromText("rkp4c-7iaaa-aaaaa-aaaca-cai")
```

Get the actual canister ID after deployment:
```bash
dfx canister id token
```

## 🛠️ Tech Stack

**Frontend:**
- React 18
- React Router v6
- React Hook Form
- Webpack 5

**Backend:**
- Motoko
- Internet Computer SDK

**Blockchain:**
- Internet Computer Protocol (ICP)

## 📝 Smart Contract Methods

### mintmine Canister

- `mint(imageData: [Nat8], name: Text)` - Create a new NFT
- `listItem(id: Principal, price: Nat)` - List NFT for sale
- `completePurchase(id: Principal, seller: Principal)` - Complete purchase
- `getOwnedNFTs(user: Principal)` - Get user's NFTs
- `getListedNFTs()` - Get all listed NFTs
- `getListedNFTPrice(id: Principal)` - Get NFT price
- `isListed(id: Principal)` - Check if NFT is listed

### NFT Canister

- `getName()` - Get NFT name
- `getOwner()` - Get current owner
- `getAsset()` - Get image data
- `transferOwnership(newOwner: Principal)` - Transfer NFT

### Token Canister

- `transfer(to: Principal, amount: Nat)` - Transfer tokens
- `balanceOf(account: Principal)` - Check balance

## 🔐 Security Considerations

- All transactions are on-chain and immutable
- NFT ownership is managed by smart contracts
- Token transfers are atomic
- Asset data is stored permanently on the blockchain

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
dfx stop
dfx start --clean --background
```

**Module hash errors:**
```bash
dfx deploy --mode reinstall
```

**Frontend not updating:**
```bash
npm run build
dfx deploy mintmine_assets
```

## 🙏 Acknowledgments

- Built on the [Internet Computer](https://internetcomputer.org/)
- Powered by [DFINITY](https://dfinity.org/)
- React framework by [Meta](https://react.dev/)


**Happy Minting! 🚀**
