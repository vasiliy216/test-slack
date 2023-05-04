import { NextApiRequest } from "next/types"
import { DBModalType, ObjType, ModalType, FilterQuery } from "custom-db/db-type"
import { getUniqueId } from "utils/get-unique-id"
import { DbConnect } from "utils/db-connect"

const defaultDb = {
	user: [],
	circle: [],
	album: [],
	channel: [],
	message: []
}

export class DBController {
	private _dataDb: DBModalType
	private _req: NextApiRequest
	private _status: boolean

	constructor(req: NextApiRequest) {
		console.log("\x1b[33mDB Connect!\x1b[0m")
		this._dataDb = defaultDb
		this._req = req
		this._status = false
		this._init(req)
	}

	private async _init(req: NextApiRequest) {
		const res = await DbConnect({ method: "GET", req })
		console.log("statusCode", res.statusCode)
		if (res.statusCode === 200) {
			this._status = true
			this._dataDb = res.data
			// console.log("_dataDb", res.data)
		}
	}

	private async _updateDb(_newData: ObjType) {
		const data = { ...this._dataDb, ..._newData }
		this._dataDb = data
		const res = await DbConnect({ method: "POST", req: this._req, data })
		if (res.statusCode === 200) {
			this._status = false
			await this.checkData()
		}
	}

	private _getCurrentModal(modal: ModalType) {
		return this._dataDb[modal]
	}

	private async checkData() {
		if (this._status) { return }
		await this._init(this._req)
		await this.checkData()
	}

	async getAll(modal: ModalType) {
		await this.checkData()
		return this._dataDb[modal]
	}

	async findOne(modal: ModalType, query: FilterQuery) {
		await this.checkData()
		const currentModal = this._getCurrentModal(modal) as Array<ObjType>
		const data = currentModal?.find((o: ObjType) => Object.entries(query).every(([key, value]) => o[key as keyof typeof o] === value))
		return data as any
	}

	async create(modal: ModalType, obj: ObjType) {
		await this.checkData()
		const newData = { _id: getUniqueId(), ...obj }
		const currentModal = this._getCurrentModal(modal)
		currentModal.push(newData)
		this._updateDb({ [modal]: currentModal })
		return newData as any
	}
}