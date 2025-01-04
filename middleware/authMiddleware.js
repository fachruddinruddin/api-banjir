const jwt = require('jsonwebtoken');

// Middleware untuk memverifikasi token
const protect = (req, res, next) => {
    let token;

    // Memeriksa apakah ada token di header Authorization
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Verifikasi token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Menyimpan userId pada request object untuk akses di route selanjutnya
            req.user = decoded.id;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No token, authorization denied' });
    }
};

module.exports = protect;
