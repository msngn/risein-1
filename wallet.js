var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _this = this;
var _a = require('@solana/web3.js'), Keypair = _a.Keypair, Connection = _a.Connection, clusterApiUrl = _a.clusterApiUrl, LAMPORTS_PER_SOL = _a.LAMPORTS_PER_SOL, PublicKey = _a.PublicKey, Transaction = _a.Transaction, SystemProgram = _a.SystemProgram, sendAndConfirmTransaction = _a.sendAndConfirmTransaction;
var fs = require('fs');
var connection = new Connection(clusterApiUrl('testnet'), 'confirmed');
var createWallet = function () { return __awaiter(_this, void 0, void 0, function () {
    var wallet, walletData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                wallet = Keypair.generate();
                walletData = {
                    publicKey: wallet.publicKey.toString(),
                    secretKey: __spreadArray([], wallet.secretKey, true),
                };
                fs.writeFileSync('wallet.json', JSON.stringify(walletData));
                console.log('Wallet created:', wallet.publicKey.toString());
                return [4 /*yield*/, getBalance(wallet.publicKey.toString())];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var requestAirdrop = function (amount) {
    if (amount === void 0) { amount = 1; }
    return __awaiter(_this, void 0, void 0, function () {
        var walletData, wallet, airdropSignature;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    walletData = JSON.parse(fs.readFileSync('wallet.json', 'utf8'));
                    wallet = Keypair.fromSecretKey(Uint8Array.from(walletData.secretKey));
                    return [4 /*yield*/, connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL)];
                case 1:
                    airdropSignature = _a.sent();
                    return [4 /*yield*/, connection.confirmTransaction(airdropSignature)];
                case 2:
                    _a.sent();
                    console.log("".concat(amount, " SOL airdrop done."));
                    return [4 /*yield*/, getBalance(wallet.publicKey.toString())];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};
var getBalance = function (publicKeyStr) { return __awaiter(_this, void 0, void 0, function () {
    var walletData, wallet, balance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                walletData = JSON.parse(fs.readFileSync('wallet.json', 'utf8'));
                wallet = Keypair.fromSecretKey(Uint8Array.from(walletData.secretKey));
                return [4 /*yield*/, connection.getBalance(wallet.publicKey)];
            case 1:
                balance = _a.sent();
                console.log("Balance: ".concat(balance / LAMPORTS_PER_SOL, " SOL"));
                return [2 /*return*/, balance / LAMPORTS_PER_SOL];
        }
    });
}); };
var transferSOL = function (toPublicKeyStr, amount) { return __awaiter(_this, void 0, void 0, function () {
    var walletData, fromWallet, toPublicKey, transaction, signature;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                walletData = JSON.parse(fs.readFileSync('wallet.json', 'utf8'));
                fromWallet = Keypair.fromSecretKey(Uint8Array.from(walletData.secretKey));
                toPublicKey = new PublicKey(toPublicKeyStr);
                transaction = new Transaction().add(SystemProgram.transfer({
                    fromPubkey: fromWallet.publicKey,
                    toPubkey: toPublicKey,
                    lamports: amount * LAMPORTS_PER_SOL,
                }));
                return [4 /*yield*/, sendAndConfirmTransaction(connection, transaction, [
                        fromWallet,
                    ])];
            case 1:
                signature = _a.sent();
                console.log("Transfer completed: ".concat(signature));
                return [2 /*return*/];
        }
    });
}); };
var main = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, createWallet()];
            case 1:
                _a.sent();
                return [4 /*yield*/, requestAirdrop()];
            case 2:
                _a.sent();
                return [4 /*yield*/, transferSOL(Keypair.generate().publicKey.toString(), 0.1)];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
main();
