const createUserController = async (req, res) => {
    res.send("create")
};

const findAllUserController = async (req, res) => {
    res.send("find all")
};

export { createUserController, findAllUserController };
