const LogoutCon= {};

LogoutCon.logout = async (req,res) => {
    res.clearCookie("authToken",{httpOnly: true});

    return res.json({message : "Sesion cerrada"});
}

export default LogoutCon;