const { PrismaClient } = require("@prisma/client");
const { hashPassword } = require("../utils/hashPassword");
const prisma = new PrismaClient();

function getSignup(req, res) {
    res.render("signup");
}

async function signUpUser(req, res) {
    const user = req.body;
    const password = await hashPassword(user.password);
    try {
        await prisma.users.create({
            data: { email: user.email, password: password }
        })
        res.send("you have succesfully signed up.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Unsuccessful sign-up.");
    }
}

module.exports = { getSignup, signUpUser };