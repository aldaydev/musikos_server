import multer from 'multer';

// Configurar multer para almacenar archivos en una carpeta "uploads"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

const upload = multer({ storage: storage });

// const upload = multer({ 
//     storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, // Limitar el tamaño a 5MB
//     fileFilter: (req, file, cb) => {
//       const fileTypes = /jpeg|jpg|png|gif/; // Extensiones permitidas
//       const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//       const mimetype = fileTypes.test(file.mimetype);
      
//       if (mimetype && extname) {
//         return cb(null, true);
//       } else {
//         cb(new Error("Solo se permiten imágenes en formato JPEG, JPG, PNG o GIF"));
//       }
//     }
//   });

  export {storage, upload};