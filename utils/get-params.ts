type getParamsType = "sql" | "query"
type getParamsOperationType = "AND" | "OR" | "SET"
type getParamsValueType = string | number | null | undefined
type getParamsDataType = { [key: string]: getParamsValueType }

const _p = { AND: " AND ", OR: " OR ", SET: ", " }

const query = {
	"sql": ([key, value]: getParamsValueType[]) => `${key} = '${value}'`,
	"query": ([key, value]: getParamsValueType[]) => `${key}=${value}`
}

export const getParams = (data: getParamsDataType, type: getParamsType, operation?: getParamsOperationType) => {
	if (!data) { return "" }
	return Object.entries(data).map(query[type]).join(operation ? _p[operation] : "&")
}