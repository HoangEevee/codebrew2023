const Account = require("../models/account");
const commonList = require("../models/commonList");

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
        const account = new Account({name: name, password: password, email: email, age: age, fbAcc: fbAcc, IgAcc: IgAcc, wishlist: wishlist});
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

    // wish content should be summarised, lemmatised because it can be put into the commonList because otherwith
    // there will be different versions of the same thing because of different wording

    try {
        await Account.findOneAndUpdate({ email: email }, { $push: { wishlist: wish } }); // (query, update)
        wishID = await commonList.exists({'wish.wish': wish.wish})._id
        // if the wish is not in the database, save it to the common list, if it is in it, increment the count
        if (wishID) {
            commonList.findOneAndUpdate({_id: wishID}, {$inc : {'count' : 1}})
        } else {
            const newWish = new commonList( {wish: wish.wish, count: 0} );
            await newWish.save();
        }
        res.status(201).send('wish added to your list!');
    } catch(err) {
        res.status(400).send(err.message);
    }
}

const addWishlist = async(req, res) => { //
    const {email, wishlist} = req.body;
    len = wishlist.length;
    for (let i=0; i<len; i++) {
        const wish = wishlist[0];
        try {
            await Account.findOneAndUpdate({ email: email }, { $push: { wishlist: wish } }); // (query, update)
            wishID = await commonList.exists({'wish.wish': wish.wish})._id
            // if the wish is not in the database, save it to the common list, if it is in it, increment the count
            if (wishID) {
                commonList.findOneAndUpdate({_id: wishID}, {$inc : {'count' : 1}})
            } else {
                const newWish = new commonList( {wish: wish.wish, count: 0} );
                await newWish.save();
            }
            res.status(201).send('wish added to your list!');
        } catch(err) {
            res.status(400).send(err.message);
        }
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

// right now, it is just returning the top ten most common wishes from the commonList 
// later, we should be able to fit a logistic model for each wish in the list using personal information as predictor
// and feedback the top10 wishes with the highest probability for the user to choose from
// 
// in the case of no social network account provided

const getTopTenWish = async(req, res) => {
    try {
        const topTen = await commonList.find().sort({count: -1}).limit(10).lean();
        res.send(topTen);
    } catch(err) {
        res.send(err.message);
    }
}

const getRandomTen = async(req, res) => {
    try {
        const randomTen = await commonList.findRandom().limit(10).lean();
        res.send(randomTen);
    } catch(err) {
        res.send(err.message);
    }
}

module.exports = {
    getAllAccounts, createAccount, login, addWish, addWishlist, changeWish, finishWish, getTopTenWish, getRandomTen
}
