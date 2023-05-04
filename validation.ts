export const validationFirstName =[{ required: true, message: "Please input your First Name!" },{min:1, max: 32, message: "First Name must be between 1 and 32"},{pattern:/^[a-zA-Z0-9]+$/, message: "Field accepts alphabetical char and digits, no special chars allowed"}]
export const validationSecondName =[{ required: true, message: "Please input your Last Name!" },{min:1, max: 32,  message: "Last Name must be between 1 and 32"},{pattern:/^[a-zA-Z0-9]+$/, message: "Field accepts alphabetical char and digits, no special chars allowed"}]
export const validationChannelName =[{ required: true, message: "Please input the title of channel!" }, {min:1, max: 80, message: "Channel Name must be between 1 and 80"},{pattern:/^[a-zA-Z0-9_-]+$/, message: "Channels Name cannot contain spaces or most punctuation"}]
export const validationPassword =[{pattern:/((?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,20})/, message:"Password should contain at least one upper-case, at least one lower-case and at least one digit and be between 8 and 20"}]
export const validationAlbumName =[{ required: true, message: "Please input the title of Album!" }, {min:1, max: 20, message: "Album Name must be between 1 and 20"},{pattern:/^[a-zA-Z0-9_-]+$/, message: "Album Name cannot contain spaces or most punctuation"}]