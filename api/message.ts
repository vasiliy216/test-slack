import { Message } from "types"

export const getMessagesByChannel = async (channelId: string) => {
	try {
		const res = await fetch(`/api/messages?id=${channelId}`, {
			method: "GET"
		})
		const json = await res.json()
		return json
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong" }
	}
}
// export const getMessages = async(channelId: string)=>{
// 	try{
// 		const res= await fetch("/api/messages",{
// 			method:"GET"
// 		})
// 		const json = await res.json()
// 		return json
// 	}catch(error){
// 		console.log(error)
// 		return{ status:false,message:"Something was wrong"}
// 	}
// }
export const getMessage = async (channelId: string, id: string) => {
	try {
		const res = await fetch(`/api/messages?id=${id}`, {
			method: "GET"
		})
		const json = await res.json()
		return json
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong" }
	}
}
export const createMessageApi = async (channelId:string, message:Message) =>{
	try{
		const res = await fetch("/api/messages",{
			method:"POST",
			headers:{"Content-Type":"application/json"},
			body:JSON.stringify({message})
		})
		const json = await res.json()
		return {
			status: res.status === 200,
			message: json.message || ""

		}
	} catch (error) {
		console.log(error)
		return {
			status: false, message: "Something was wrong", data: null
		}
	}
}
export const updateMessageApi = async(channelId:string, message:Message, id:string)=>{
	try{
		const res = await fetch("/api/messages",{
			method:"PUT",
			headers:{"Content-Type":"application/json"},
			body:JSON.stringify({message,id})
		})
		const json = await res.json()
		return {
			status: res.status === 200,
			message: json.message || ""

		}

	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong", data: null }
	}
}

export const deleteMessageApi =async(channelId:string, id:string)=>{
	try{
		const res = await fetch("/api/messages",{
			method:"DELETE",
			headers:{"Content-Type":"application/json"},
			body:JSON.stringify({id})
			
		})
		
		const json = await res.json()
		return {
			status: res.status === 200,
			message: json.message || ""

		}
	} catch (error) {
		console.log(error)
		return {
			status: false, message: "Something was wrong", data: null
		}
	}
} 