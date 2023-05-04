import { nanoid } from "nanoid"

export const getUniqueId = () => nanoid(15).replace("_", "p")