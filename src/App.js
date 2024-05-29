import "./App.css";
import { Lucid, Blockfrost } from "lucid-cardano";
import { useState } from "react";

function App() {
	const [cbor, setCbor] = useState("");

	const signTransaction = async () => {
		const lucid = await Lucid.new(
			new Blockfrost(
				"https://cardano-preview.blockfrost.io/api/v0",
				"previewWenCzTRwLmYSJuTHiZv5yiqdkJ7l2Iih"
			),
			"Preview"
		);
		const api = await window.cardano.nami.enable();
		lucid.selectWallet(api);
		const unsigned = await lucid
			.newTx()
			.payToAddress(
				"addr_test1qppavs25cr2fn57e4uszpcv06y7pkvjcsczju3j8p4s9543kfglnwy0f3fh3mrv9hc8hr844wa668cgyvxs5qxuxwuhs6ehze4",
				{ '8d2a90fab86ad0869ce94cbaad93a1217bc2f2bafb84e3bc27b5b92d': 500n }
			)
			.complete().catch(err => console.log({ err }));

		console.log({ unsigned })
		const signed = await unsigned.sign().complete();
		const hash = await signed.submit();
		setCbor(hash);
	};
	return (
		<div className="App">
			<button onClick={async () => {
				try {
					await signTransaction()
				} catch (error) {
					console.error(error)
				}
			}}>Sign transaction</button>
			<br />
			<textarea value={cbor} />
		</div>
	);
}

export default App;
