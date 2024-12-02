import jwt from "jsonwebtoken";

const GenerateJWTTokenAndCookie = (userID, res) => {
    const key = process.env.SECRET_JWT_KEY;
    if(!key) {
        throw new Error("JWT Key not found!");
    }

    const token = jwt.sign({userID}, key, {expiresIn: "10d"});
    console.log("Ayushhhhhhhhhhhhh",process.env.MODE);
    res.cookie("jwt", token, {
        maxAge: 10*24*60*60*1000,
        httpOnly: true,
        secure: process.env.MODE !== "development"
    })
};

export default GenerateJWTTokenAndCookie;