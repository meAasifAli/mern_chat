import jwt from 'jsonwebtoken'

const genTokenSetCookie = (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" })
        res.cookie("jwt", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict"
        })
        return token
    } catch (error) {
        console.log(error);
    }
}

export default genTokenSetCookie;