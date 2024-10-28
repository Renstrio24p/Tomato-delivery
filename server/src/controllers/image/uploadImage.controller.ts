import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import { Request, Response, NextFunction } from "express";

// Ensure uploads directory exists
async function ensureUploadsDirectory() {
    try {
        await fs.promises.mkdir("src/uploads", { recursive: true });
    } catch (error: any) {
        if (error.code === "EPERM") {
            console.error("Permission denied when creating uploads directory:", error);
        } else {
            console.error("Error creating uploads directory", error);
        }
    }
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: async (_req, _file, cb) => {
        await ensureUploadsDirectory();
        cb(null, "src/uploads");
    },
    filename: (_req, file, cb) => {
        const baseName = file.originalname ? path.parse(file.originalname).name : "file";
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${baseName}-${uniqueSuffix}${path.extname(file.originalname || ".webp")}`);
    }
});

const storageUser = multer.diskStorage({
    destination: async (_req, _file, cb) => {
        await ensureUploadsDirectory();
        cb(null, "src/uploads/users");
    },
    filename: (_req, file, cb) => {
        const baseName = file.originalname ? path.parse(file.originalname).name : "file";
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `user-${baseName}-${uniqueSuffix}${path.extname(file.originalname || ".webp")}`);
    }
});

// Multer upload instance
export const upload = multer({
    storage: storage,
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed!"));
        }
    }
});

export const uploadUser = multer({
    storage: storageUser,
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed!"));
        }
    }
});

// WebP conversion middleware


export const convertToWebp = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next();

    const originalPath = req.file.path;
    const webpPath = path.join(req.file.destination, `${path.parse(req.file.filename).name}.webp`);

    try {
        await sharp(originalPath)
            .webp({ quality: 80 })
            .toFile(webpPath);

        // Remove the original file after conversion
        fs.unlinkSync(originalPath);

        // Update the file information to point to the WebP file
        req.file.filename = `${path.parse(req.file.filename).name}.webp`;
        req.file.path = webpPath;

        next();
    } catch (error) {
        console.error("Error converting to WebP:", error);
        res.status(500).json({ message: "Failed to process image" });
    }
};

