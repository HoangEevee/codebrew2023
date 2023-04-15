const Account = require("../models/account");
const commonList = require("../models/commonList");
const CommonList = require("../models/commonList");


const getAllAccounts = async (req,res) => {
    try {
        const accounts = await Account.find().lean();
        res.send(accounts);
    } catch (err) {
        console.log(err);
    }
}

const createAccount = async (req, res) => {
    const {name, password, email, age, fbAcc, IgAcc, wishlist} = req.body;

    try {
        const account = new Account({name: name, password: password, email: email, age: age, fbAcc: fbAcc, fbAcc: IgAcc, wishlist: wishlist});
        await account.save();
        res.send('Account created. Welcome!');
    } catch (err) {
        res.status(400).send(err.message);
    }
}

// we are using email and password to login
const login = async (req, res) => {
    const {email, password} = req.body;
    console.log(email,password)
    try {
        const account = await Account.exists({email: email, password: password});
        if (account) {
            // do we need all the account information?
            console.log(account)
            res.send(account.lean());
        } else {
            res.send('Account not found!');
        }
    } catch(err) {
        res.send(err.message);
    }
}

// add a new wish to the wishlist of the selected user
const addWish = async(req, res) => {
    const {email, wish}  = req.body; 
    // wish will be in the form {wish:wish, schedFin:date, could be null, completed:default false}
    try {
        await Account.findOneAndUpdate({ email: email }, { $push: { wishlist: wish } }); // (query, update)
        res.status(201).send('wish added to your list!');
    } catch(err) {
        res.status(400).send(err.message);
    }
}

const changeWish = async(req, res) => {
    const {email, wish}  = req.body;
    // wish will be in the form {wish:wish, schedFin:date, could be null, completed:default false}
    try {
        await Account.findOneAndUpdate({email: email, 'wishlist.wish': wish.wish}, wish);
        res.status(202).send('wish added to your list!');
    } catch(err) {
        res.status(400).send(err.message);
    }
}

const finishWish = async(req, res) => {
    const {email, wish} = req.body;
    try {
        await Account.findOneAndUpdate({email: email, 'wishlist.wish': wish.wish}, {'wishlist.wish.completed': true});
        res.send('The specified wish is completed');
    } catch(err) {
        res.status(400).send(err.message);
    }
}

const getTopTenWish = async(req, res) => {
    try {
        const topTen = await commonList.find().sort({count: -1}).limit(10).wish.lean();
        res.send(topTen);
    } catch(err) {
        res.status(400).send(err.message);
    }
}

const getRandomTen = async(req, res) => {
    try {
        const randomTen = await commonList.findRandom().limit(10).wish.lean();
        res.send(randomTen)
    } catch(err) {
        res.status(400).send(err.message);
    }
}

module.exports = {
    getAllAccounts, createAccount, login, addWish, changeWish, finishWish, getTopTenWish, getRandomTen
}
