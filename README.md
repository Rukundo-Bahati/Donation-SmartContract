🎓 Decentralized Scholarship Funding dApp
This is a full-stack decentralized application (dApp) that allows users to:

Donate ETH to a scholarship fund

Apply for a scholarship

Admin-only fund release to scholarship recipients

Built with Solidity, Truffle, and React (JavaScript), and tested locally on Ganache.

📂 Project Structure
bash
Copy
Edit
.
├── contracts/
│   └── Scholarship.sol          # Smart contract
├── migrations/
│   └── 1_deploy_contracts.js    # Migration script
├── build/
│   └── contracts/Scholarship.json # ABI + deployed addresses (auto-generated)
├── src/
│   └── App.js                   # React frontend
│   └── App.css                  # Frontend styles
├── package.json
├── truffle-config.js
└── README.md
🚀 Getting Started
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/Rukundo-Bahati/Donation-SmartContract.git
cd scholarship-dapp
2. Install Dependencies
bash
Copy
Edit
npm install
3. Start Ganache (Local Blockchain)
If not installed:

bash
Copy
Edit
npm install -g ganache
Start Ganache:

bash
Copy
Edit
ganache
4. Compile & Deploy Smart Contract
bash
Copy
Edit
truffle compile
truffle migrate --network development
Make sure Ganache is running before migrating.

5. Start React Frontend
bash
Copy
Edit
npm start
⚙️ Contract: Scholarship.sol
Features:

donate() - Accept ETH donations

applyForScholarship() - Register a wallet as an applicant

releaseFunds(address recipient, uint256 amount) - Admin-only fund release

getBalance() - View contract balance

🧠 Technologies Used
Solidity ^0.8.0

Truffle ^5.11.5

React.js (no TypeScript)

Web3.js

Ganache CLI / GUI

MetaMask

✅ Usage
Connect your MetaMask wallet.

Donate any amount of ETH.

Apply as a scholarship candidate.

If you're the admin (deployer), release funds to applicants.

💡 Notes
MetaMask must be installed and connected to the same network as Ganache.

The frontend uses the ABI from build/contracts/Scholarship.json.

If you get a MetaMask error like “Already processing eth_requestAccounts,” wait or reload the app.

📄 License
MIT License

