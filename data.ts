const users = [{
	id: "1AA",
	avatar: "https://joesch.moe/api/v1/random?key=1",
	username: "Bret",
	firstName: "Leanne",
	lastName: "Graham",
	email: "Sincere@april.biz",
	password: "Sincere"
},
{
	id: "2AA",
	avatar: "https://joesch.moe/api/v1/random?key=2",
	username: "Antonette",
	firstName: "Ervin",
	lastName: "Howell",
	email: "Shanna@melissa.tv",
	password: "Shanna"
},
{
	id: "3AA",
	avatar: "https://joesch.moe/api/v1/random?key=3",
	username: "Samantha",
	firstName: "Clementine",
	lastName: "Bauch",
	email: "Nathan@yesenia.net",
	password: "Nathan"
}]

const circle =[{
	name: "Post office", // id
	userIds: ["2AA","1AA"],
	passCode: "tracking",
	channelIds: ["puSXT_15vJtON22"],
	albumIds: ["puSXT_15vJtON89"]
},
{
	name: "Nature", 
	userIds: ["3AA","1AA"],
	passCode: "Travelling",
	channelIds: ["puSXT_15vJtON11"],
	albumIds: ["puSXT_12vJtONjY","puSXT_12vJtONjoo","puSXT_11vJtONjY","puSXT_15vJtONj8"]
}]

const albums =[{
	id:"puSXT_12vJtONjY",
	name: "Spring",
	photos: ["https://images.pexels.com/photos/414181/pexels-photo-414181.jpeg?cs=srgb&dl=pexels-pixabay-414181.jpg&fm=jpg", "https://i.natgeofe.com/n/ffa89c3a-eec2-4fb9-bbb9-48361b8a058b/33670.jpg?w=636&h=477"]
},
{
	id:"puSXT_12vJtONjoo",
	name: "Winter",
	photos: ["https://www.almanac.com/sites/default/files/styles/or/public/image_nodes/winter-sunset-Marina%20Zezelina-SS.jpeg?itok=mv07CRwx", "https://c.tadst.com/gfx/600x337/winter-lake.jpg?1"]
},{
	id:"puSXT_11vJtONjY",
	name: "Summer",
	photos: ["https://community.thriveglobal.com/wp-content/uploads/2020/06/summer.jpg", "https://guardian.ng/wp-content/uploads/2022/07/Starfish-Resorts.-Photo-Linq-at-North-Springs-scaled.jpg"]
},
{
	id:"puSXT_15vJtONj8",
	name: "Automn",
	photos: ["https://taurica.net/data/posts/2017/11/18/1510981334_osen.jpg", "https://phonoteka.org/uploads/posts/2021-04/1618583109_42-phonoteka_org-p-krasivii-fon-osen-57.jpg"]
}, 
{
	id:"puSXT_15vJtON89",
	name: "Post Office",
	photos: ["https://static.vecteezy.com/system/resources/previews/003/586/995/original/post-office-building-in-flat-style-in-the-city-on-a-summer-day-with-a-bike-at-the-entrance-illustration-free-vector.jpg", "https://ichef.bbci.co.uk/news/976/cpsprodpb/14B27/production/_118857748_postofficesigngetty.jpg"]
}
] 

const channels = [{
	id: "puSXT_15vJtON11",
	name: "Travelling ",
	messageIds: ["puSXT_15","puSXT_14"]
},
{
	id: "puSXT_15vJtON22",
	name: "Work",
	messageIds: ["puSXT_16","puSXT_17","puSXT_18", "puSXT_19"]
}]

const messages = [{
	id: "puSXT_15",
	userId: "3AA",
	text: "Hello. what is new with you",
	date: "1681122803703"
},
{
	id: "puSXT_14",
	userId: "1AA",
	text: "Hello. I am  fond of travelling. It is very interesting to see new places, another towns and countries",
	date: "1681122803704"
},
{
	id: "puSXT_16",
	userId: "1AA",
	text: "I sent a registered parcel to Howrah about a month ago. Today I got a letter from the friend it was addressed to and he said he didn’t receive it.?",
	date: "1681122803703"
},
{
	id: "puSXT_17",
	userId: "2AA",
	text: "Have you brought the receipt",
	date: "1681123218490"
},
{
	id: "puSXT_18",
	userId: "1AA",
	text: "Yes sir, here it is. You can see that the parcel was sent on 10th December, and it was insured for Rs 150",
	date: "1681123218500"
},
{
	id: "puSXT_19",
	userId: "2AA",
	text: "It should certainly have reached the recipient about a week ago",
	date: "1681123218599"
}]