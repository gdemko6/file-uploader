const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs").promises;

router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    const folders = await prisma.folder.findMany({
      where: { userId: req.user.id },
    });
    res.render("folders", { folders: folders });
  } catch (err) {
    res.status(500).json({ message: "Error fetching folders" });
  }
});

router.post("/", ensureAuthenticated, async (req, res) => {
  try {
    const { name } = req.body;
    const folder = await prisma.folder.create({
      data: {
        name,
        userId: req.user.id,
      },
    });
    //after folder creation send new array of folders that includes
    //the new one
    const folders = await prisma.folder.findMany({
      where: { userId: req.user.id },
    });
    res.render("folders", { folders: folders });
  } catch (err) {
    res.status(500).json({ message: "Error creating folder" });
  }
});

router.delete("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const folder = await prisma.folder.findUnique({
      where: { id: req.params.id },
    });

    if (!folder || folder.userId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Forbidden: You cannot delete this folder" });
    }

    await prisma.file.deleteMany({ where: { folderId: req.params.id } });
    await prisma.folder.delete({ where: { id: req.params.id } });

    res.json({ message: "Folder deleted successfully" }); // Server response
  } catch (err) {
    res.status(500).json({ message: "Error deleting folder" });
  }
});

router.get("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const folderId = req.params.id;

    //Need folder data as well as the files contained within
    const folder = await prisma.folder.findUnique({
      where: { id: folderId },
      include: { files: true },
    });

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }
    if (folder.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.render("upload", {
      folderId: folder.id,
      folderName: folder.name,
      files: folder.files,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error loading folder.");
  }
});

router.delete("/:id/:fileId", ensureAuthenticated, async (req, res) => {
  try {
    const file = await prisma.file.findUnique({
      where: { id: req.params.fileId },
    });

    if (!file) {
      return res.status(404).send("File not found");
    }

    if (file.userId !== req.user.id || file.folderId !== req.params.id) {
      return res.status(403).send("Unauthorized");
    }

    // Delete the actual file that is stored on disk
    try {
      await fs.unlink(file.path);
    } catch (err) {
      console.error("Failed to delete file from disk:", err);
      return res.status(500).send("Failed to delete file from disk");
    }

    // Delete the file metadata in the database
    await prisma.file.delete({
      where: { id: file.id },
    });

    res.status(200).send("File deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting file");
  }
});

router.get("/:id/:fileId/download", ensureAuthenticated, async (req, res) => {
  try {
    // Gather the metadata stored in our "file" table to retrive the actual file
    // from the uploads folder using that path
    const file = await prisma.file.findUnique({
      where: { id: req.params.fileId },
    });

    if (!file) {
      return res.status(404).send("File not found");
    }

    if (file.userId !== req.user.id || file.folderId !== req.params.id) {
      return res.status(403).send("Unauthorized");
    }

    res.download(file.path, file.filename);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error downloading file");
  }
});

//make sure user is authenticated before allowing access to the folders
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized: Please log in" });
}

module.exports = router;
