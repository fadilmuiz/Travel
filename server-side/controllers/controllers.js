const { Travel, User, Favorite } = require('../models/index')
const bcrypt = require('bcrypt')
const { generateToken } = require('../helpers/jwt')
const midtransClient = require('midtrans-client')
const nodemailer = require("nodemailer");

class Controller {
    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body
            const data = await User.create({ username, email, password, status: "Free" })

            const user = await User.findOne({ where: { email: email } })

            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                   user: "bagastama.putra97@gmail.com",
                   pass: "yaidshpqwdksbjwk",
                },
             });


             let info = await transporter.sendMail({ 
                from: "fadilmuiz1319@gmail.com",
                to: user.email,
                subject: "Thanks for register",
                text: `Thanks my customer`
             });
            //  console.log("Message sent: %s", info.messageId);
            //  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
             
             transporter.sendMail(info, (err, info) => {
                if (err) console.log(err);
             });

            res.status(201).json({
                message: data
            })
        } catch (err) {
            console.log(err);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const data = await User.findOne({ where: { email: email } })
            if (!data) throw { name: "no e-mail" }
            const isValidPw = bcrypt.compareSync(password, data.password)
            if (isValidPw) {
                const token = generateToken({
                    id: data.id,
                    username: data.username
                })
                res.status(200).json({
                    email: `${data.email}`,
                    token: token
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async readTravel(req, res, next) {
        const axios = require('axios');
        const options = {
            method: 'GET',
            url: 'https://the-fork-the-spoon.p.rapidapi.com/restaurants/list',
            params: {
                queryPlaceValueCityId: '348156',
                pageSize: '10',
                pageNumber: '1'
            },
            headers: {
                'X-RapidAPI-Key': '78bdb552d7msh21aeb8d7aa96ca3p16dcc2jsne3c25e8f5066',
                'X-RapidAPI-Host': 'the-fork-the-spoon.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            // console.log(response.data);
            res.status(200).json({
                statusCode: 200,
                message: response.data
            })
        } catch (error) {
            console.error(error);
        }
    }

    static async addFavorites(req, res, next) {
        try {
            const { id } = req.params
            const { name, image, street, address } = req.body
            console.log(req.body);
            const { userId } = req.additionalData
            const addTravels = await Favorite.create({ TravelId: id, UserId: userId, name: name, image: image, street: street, address: address })
            res.status(201).json({
                data: addTravels
            })
        } catch (err) {
            console.log(err);
        }
    }

    static async readFavorite(req, res, next) {
        try {
            const data = await Favorite.findAll({
                where: { UserId: req.additionalData.userId }
            })
            res.status(200).json({
                data: data
            })
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteFavorite(req, res, next) {
        try {
            const { id } = req.params
            const favoriteId = await Favorite.findOne({
                where: { id },
            })
            if (!favoriteId) throw { name: "Id not found" }
            const destroy = await Favorite.destroy({
                where: {
                    id: id
                }
            })

            if (destroy) {
                res.status(200).json({
                    statusCode: 200,
                    message: `${favoriteId.name} Success to deleted from your favorites`
                })
            } else {
                throw { name: "failed" }
            }
        } catch (err) {
            console.log(err);
        }
    }


    static async subscribe(req, res, next) {
        try {
            const data = await User.update({ status: "GOLD" },
                {
                    where: { id: req.additionalData.userId },
                    returning: true
                })
            res.status(200).json(data)
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    static async midtrans(req, res, next) {
        try {
            const findUser = await User.findByPk(+req.additionalData.userId);
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.SERVERKEY_MIDTRANS,
            });

            let parameter = {
                transaction_details: {
                    order_id: Math.floor(Math.random() * 100000),
                    gross_amount: 100000,
                },
                credit_card: {
                    secure: true,
                },
                customer_details: {
                    email: findUser.email,
                },
            };

            const midtrans_token = await snap.createTransaction(parameter);
            res.status(201).json(midtrans_token);
        } catch (err) {
            next(err);
        }
    }

    static async githubLogin(req, res, next) {
        try {
            const { email, displayName } = req.body;
            const [user, created] = await User.findOrCreate({
                where: { email },
                defaults: { username: displayName, email: email, password: '123', status: "Free" },
            });

            let token;
            let findUser;
            if (created) {
                token = generateToken({ id: user.id, email: user.email });
                // console.log("masok", token);
                findUser = user;
                res.status(201).json({
                    findUser,
                    token
                });
            } else {
                token = generateToken({ id: user.id, email: user.email });
                findUser = user;
                res.status(200).json({
                    findUser,
                    token
                });
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = Controller