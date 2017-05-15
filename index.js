function getMemory() {
    const memory = Math.floor(process.memoryUsage().heapUsed * 1e-6)
    return `MemoryUsage: ${memory}Mb`
}

module.exports = function create(nameSpace) {
    return function () {
        const args = Array.prototype.map.call(arguments, item => item)
        const date = new Date()

        args.unshift(nameSpace)
        args.unshift(getMemory())
        args.unshift(date.toISOString().replace('T', ' ').split('.')[0])

        const argsForPrint = args.map(item => {
            if (typeof item === 'object' && item !== null) {
                if (item instanceof Error) {
                    return item
                }
                return JSON.stringify(item, null, 2)
            }
            return item
        })

        console.log.apply(null, argsForPrint)
    }
}
