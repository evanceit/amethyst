
module.exports = {
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>./src/$1"
    },
    transform: {
        '^.+\\.tsx?$': 'babel-jest'
    }
}