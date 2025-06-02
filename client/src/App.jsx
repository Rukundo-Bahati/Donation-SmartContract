import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Scholarship from "../../build/contracts/Scholarship.json";
import "./App.css";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [donation, setDonation] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [admin, setAdmin] = useState("");
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    if (isConnecting) return;
    setIsConnecting(true);

    try {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await web3Instance.eth.getAccounts();
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = Scholarship.networks[networkId];

        if (!deployedNetwork) {
          alert("Contract not deployed to this network");
          return;
        }

        const contractInstance = new web3Instance.eth.Contract(
          Scholarship.abi,
          deployedNetwork.address
        );

        setWeb3(web3Instance);
        setAccount(accounts[0]);
        setContract(contractInstance);

        const adminAddress = await contractInstance.methods.admin().call();
        setAdmin(adminAddress);

        const contractBalance = await web3Instance.eth.getBalance(contractInstance.options.address);
        setBalance(web3Instance.utils.fromWei(contractBalance, "ether"));
      } else {
        alert("Please install MetaMask");
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDonate = async () => {
    try {
      await contract.methods.donate().send({
        from: account,
        value: web3.utils.toWei(donation, "ether"),
      });
      alert("Donation successful");
      setDonation("");
      const contractBalance = await web3.eth.getBalance(contract.options.address);
      setBalance(web3.utils.fromWei(contractBalance, "ether"));
    } catch (err) {
      console.error(err);
      alert("Donation failed");
    }
  };

  const handleApply = async () => {
    try {
      await contract.methods.applyForScholarship().send({ from: account });
      alert("Application submitted");
    } catch (err) {
      console.error(err);
      alert("Application failed");
    }
  };

  const handleRelease = async () => {
    if (!web3.utils.isAddress(recipient)) {
  alert("Invalid recipient address");
  return;
}

    if (account.toLowerCase() !== admin.toLowerCase()) {
      alert("Only the admin can release funds.");
      return;
    }

    try {
      const amountInWei = web3.utils.toWei("0.1", "ether");
      await contract.methods.releaseFunds(recipient, amountInWei).send({ from: account });
      alert("Funds released");

      const contractBalance = await web3.eth.getBalance(contract.options.address);
      setBalance(web3.utils.fromWei(contractBalance, "ether"));
    } catch (err) {
      console.error(err);
      alert("Release failed");
    }
  };

  return (
    <div className="App">
      <h1>
        📈 Decentralized <span style={{ backgroundColor: "#a0b0ff" }}>Scholarship</span> Funding
      </h1>
      <button className="wallet-button" onClick={loadBlockchainData} disabled={isConnecting}>
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </button>

      <p>
        <strong>Connected Account:</strong> {account ? account : "Not connected"}
      </p>
      <p>
        <strong>Contract Balance:</strong> {balance} ETH
      </p>
      <p>
        <strong>Admin:</strong> {admin}
      </p>

      <section className="section">
        <h2>💰 Donate ETH</h2>
        <input
          type="text"
          placeholder="Amount in ETH"
          value={donation}
          onChange={(e) => setDonation(e.target.value)}
        />
        <button onClick={handleDonate}>Donate</button>
      </section>

      <section className="section">
        <h2>🎓 Apply for Scholarship</h2>
        <button onClick={handleApply}>Apply</button>
      </section>

      <section className="section">
        <h2>🔐 Release Funds (Admin Only)</h2>
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      <button onClick={handleRelease}>Release</button>

      </section>
    </div>
  );
};

export default App;
