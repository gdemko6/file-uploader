const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", ensureAuthenticated, async (req, res) => {
    try {
        const folders = await prisma.folder.findMany({
            where: { userId: req.user.id },
        });
        res.render("folders", { folders: folders});
    } catch (err) {
        res.status(500).json({ message: "Error fetching folders" });
    }
});

router.post("/", ensureAuthenticated, async(req, res) => {
    try{
        const { name } = req.body;
        const folder = await prisma.folder.create({
            data: {
                name,
                userId: req.user.id,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Error creating folder" });
    }
})

router.get("/:id")

router.post("/:id")


//make sure user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: "Unauthorized: Please log in" });
}
