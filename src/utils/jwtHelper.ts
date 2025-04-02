import jwt from 'jsonwebtoken'

const SECRET_KEY =
	process.env.JWT_SECRET ||
	'uhfeuwhjf083hfurenhuwhjf8054hw0f8hockwpoickjq0r8jf89fhw3hfuhrnewgh478ghherug9gf9eouencijwaec'

export const generateToken = (userId: string, role: string): string => {
	return jwt.sign({ userId, role }, SECRET_KEY, { expiresIn: '1h' })
}

export const verifyToken = (token: string) => {
	try {
		return jwt.verify(token, SECRET_KEY)
	} catch (error) {
		return null
	}
}
