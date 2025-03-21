const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function uploadFile(req, res) {
    try {
        const { folderId } = req.body;

        // Check that file exists and folderId was provided
        if (!req.file || !folderId) {
            return res.status(400).send("Missing file or folder ID");
        }

        const file = await prisma.file.create({
            data: {
                filename: req.file.originalname,
                path: req.file.path,
                userId: req.user.id,
                folderId: folderId,
            },
        });

        res.redirect(`/folders/${folderId}`);
    } catch (err) {
        console.error("Error uploading file:", err);
        res.status(500).send("Server error during file upload.");
    }
}

module.exports = { uploadFile };