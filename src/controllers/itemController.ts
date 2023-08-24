import Item from "../schemas/item_schema";
import { Request, Response } from "express";

interface ItemRequest extends Request {
    body: {
        brand: String,
        condition: String,
        name: String;
        type: String,
        available: String,
        item_id: String,
        desc?: String,
        location?: {
            sector?: String;
            borrower?: String;
            borrowDate?: String;
        }
    }
}

const itemController = {
    create: async (req: ItemRequest, res: Response) => {
        try {

            const item = {
                brand: req.body.brand,
                condition: req.body.condition,
                name: req.body.name,
                type: req.body.type,
                available: req.body.available,
                item_id: req.body.item_id,
                desc: req.body.desc,
                location: {
                    sector: req.body.location?.sector,
                    borrower: req.body.location?.borrower,
                    borrowDate: req.body.location?.borrowDate,
                },
            };

            const response = await Item.create(item)

            res.status(201).json({ response, msg: "Item adicionado com sucesso" })

        } catch (error: any) {
            console.log(error)
            res.status(500).json({ msg: 'Erro ao adicionar item' })
        }
    },

    readAll: async (req: ItemRequest, res: Response) => {
        try {
            const itens = await Item.find()
            res.status(200).json(itens)
        } catch (error: any) {
            console.log(error)
            res.status(500).json({ msg: 'Erro ao ler todos os itens' })
        }
    },

    readOne: async (req: ItemRequest, res: Response) => {
        try {
            const item_id: String = req.params.item_id
            const item = await Item.findOne({ item_id: item_id })

            if (!item) {
                res.status(404).json({ msg: "Item não encontrado" })
            }

            res.status(200).json(item)

        } catch (error: any) {
            console.log(error)
            res.status(500).json({ msg: 'Erro ao ler o item' })
        }
    },

    updateOne: async (req: ItemRequest, res: Response) => {
        try {
            const item = {
                brand: req.body.brand,
                condition: req.body.condition,
                name: req.body.name,
                type: req.body.type,
                available: req.body.available,
                item_id: req.body.item_id,
                desc: req.body.desc,
                location: {
                    sector: req.body.location?.sector,
                    borrower: req.body.location?.borrower,
                    borrowDate: req.body.location?.borrowDate,
                },
            };

            const item_id: String = req.params.item_id

            const updatedItem = await Item.updateOne({ item_id: item_id }, item)

            if (!updatedItem) return res.status(404).json({ msg: "Item não encontrado" })

            res.status(200).json({ item, msg: "Item atualizado com sucesso" })


        } catch (error: any) {
            console.log(error)
            res.status(500).json({ msg: 'Erro ao atualizar o item' })
        }
    }
}

export default itemController

