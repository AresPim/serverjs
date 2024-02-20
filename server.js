import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';  

import { notFoundError, errorHandler } from './middlewares/error-handler.js';

import accountRoutes from './routes/accountRoutes.js';
import authRoutes from './routes/authRoutes.js';
import blockchainContractRoutes from './routes/blockchainContractRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import journalistRoutes from './routes/journalistRoutes.js';
import journalistVerificationRoutes from './routes/journalistVerificationRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import postRoutes from './routes/postRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import userRoutes from './routes/userRoutes.js';
import voteRoutes from './routes/voteRoutes.js';

mongoose.set('strictQuery', false);

const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'fals';
const db_url = process.env.DB_URL || `mongodb://127.0.0.1:27017`;
// load  account ID and private key variables
const { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction } = require("@hashgraph/sdk");
require('dotenv').config();

//environment Setup for hedera hgraph

async function environmentSetup() {

  //Grab your Hedera testnet account ID and private key from your .env file
  const myAccountId = process.env.MY_ACCOUNT_ID;
  const myPrivateKey = process.env.MY_PRIVATE_KEY;

  // If we weren't able to grab it, we should throw a new error
  if (!myAccountId || !myPrivateKey) {
      throw new Error("Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present");
  }
  //Create your Hedera Testnet client
const client = Client.forTestnet();

//Set your account as the client's operator
client.setOperator(myAccountId, myPrivateKey);

//Set the default maximum transaction fee (in Hbar)
client.setDefaultMaxTransactionFee(new Hbar(100));

//Set the maximum payment for queries (in Hbar)
//client.setMaxQueryPayment(new Hbar(50));
}
environmentSetup();

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`${db_url}/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/img', express.static('public/images'));

  app.use('/account', accountRoutes);
  app.use('/auth', authRoutes);
  app.use('/blockchainContract', blockchainContractRoutes);
  app.use('/comment', commentRoutes);
  app.use('/journalist', journalistRoutes);
  app.use('/journalistVerification', journalistVerificationRoutes);
  app.use('/message', messageRoutes);
  app.use('/post', postRoutes);
  app.use('/report', reportRoutes);
  app.use('/user', userRoutes);
  app.use('/vote', voteRoutes);

app.use(notFoundError);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});