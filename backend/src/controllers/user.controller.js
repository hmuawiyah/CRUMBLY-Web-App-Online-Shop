import prisma from "../libs/prisma.js"
import bcrypt from "bcryptjs"

export const createUser = async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const userExists = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (userExists) return res.status(400).json({
            msg: "User already exists"
        })

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })

        // console.log({user});
        return res.status(201).json({
            msg: "success create user!",
            user
        });


    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

export const readUser = async (req, res) => {
    const id = req.user.id

    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                orders: {
                    select: {
                        id: true
                    }
                },
                // reviews: true,
                addresses: true,
            },
        })

        return res.status(200).json({
            msg: "success get user!",
            user
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

export const readAllUser = async (req, res) => {

    try {
        const user = await prisma.user.findMany()

        // console.log({user});
        return res.status(200).json({
            msg: "success get all user!",
            user
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

export const updateUser = async (req, res) => {
    const id = req.user.id
    const {
        name,
        email,
        password
    } = req.body

    const updateData = {}
    if (name) updateData.name = name
    if (email) updateData.email = email
    if (password) updateData.password = password ? await bcrypt.hash(password, 10) : undefined

    try {
        if (!Object.keys(updateData).length) {
            return res.status(400).json({
                msg: "No data provided for update"
            })
        }

        const user = await prisma.user.update({
            where: {
                id
            },
            data: updateData,
        })

        // console.log({user});
        return res.status(201).json({
            msg: "success update user!",
            user
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

// export const updateUserAndAddress = async (req, res) => {
//   const { id, name, email, password, userAddrId, address, city, province, postalCode, phone } = req.body;

//   updateDataUser = {}
//   if (name) updateDataUser.name = name
//   if (email) updateDataUser.email = email
//   if (password) updateDataUser.password = password ? await bcrypt.hash(password, 10) : undefined 

//   updateDataAddress = {}
//   if (address) updateDataAddress.address = address
//   if (city) updateDataAddress.city = city
//   if (province) updateDataAddress.province = province
//   if (postalCode) updateDataAddress.phone = postalCode
//   if (phone) updateDataAddress.phone = phone

//   try {
//     if (!Object.keys(updateDataUser).length && !Object.keys(updateDataAddress).length) {
//       return return res.status(400).json({ msg: "No data provided for update" })
//     }

//     const [updatedUser, updatedAddress] = await prisma.$transaction([
//       prisma.user.update({ where: { id: id }, updateDataUser }),
//       prisma.user_Addresses.update({ where: { id: userAddrId }, updateDataAddress }),
//     ]);

//     return res.json({ msg: "success update user and address!", user: updatedUser, address: updatedAddress });
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// };


export const deleteUser = async (req, res) => {
    const {
        id
    } = req.params

    try {
        const user = await prisma.user.delete({
            where: {
                id
            },
        })

        // console.log({user});
        return res.status(201).json({
            msg: "success delete user!",
            user
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}