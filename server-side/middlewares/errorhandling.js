function errorHandling(err, req, res, next) {
    console.log(err)
    console.log({ name: err.name });

    switch (err.name) {

        case 'SequelizeValidationError':
            res.status(400).json({ message: err.errors[0].message })
            break;
        case 'SequelizeUniqueConstraintError':
            res.status(400).json({ message: err.errors[0].message })
            break;
        case 'NO_EMAIL':
            res.status(401).json({ message: 'Invalid email/password' })
            break;
        case 'Email is required':
            res.status(401).json({ message: 'Email is required' })
            break;
        case 'Unauthorized':
            res.status(401).json({ message: 'Invalid token' })
            break;
        case 'Password is required':
            res.status(401).json({ message: 'Password is required' })
            break;
        case 'Hero not found':
            res.status(404).json({ message: 'Hero not found' })
            break;
        case 'Forbidden':
            res.status(403).json({ message: 'You are not authorized' })
            break;
        default:
            res.status(500).json({ message: 'Internal Server Error' })
            break;
    }
}

module.exports = errorHandling