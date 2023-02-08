const fs = require("fs")
const constants = require("./constants")
async function getNextId() {
  return (await getCurrentId()) + 1
}

async function getCurrentId() {
  const json = await readMetaDataFile()
  return parseInt(json.todo_count)
}

function readMetaDataFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(constants.METADATA_PATH, (err, rawData) => {
      if (!err) resolve(JSON.parse(rawData))
      else reject(err)
    })
  })
}
function readDBFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(constants.DB_PATH, (err, rawData) => {
      if (!err) resolve(JSON.parse(rawData))
      else reject(err)
    })
  })
}

const storeToDbFile = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(constants.DB_PATH, JSON.stringify(data, null, 2), (err) => {
      if (!err) resolve()
      else reject(err)
    })
  })
}

const storeToMetaDataFile = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      constants.METADATA_PATH,
      JSON.stringify(data, null, 2),
      (err) => {
        if (!err) resolve()
        else reject(err)
      }
    )
  })
}

function initializeDBFile() {
  storeToDbFile([])
    .then((result) => {
      console.log("Initialized DB File")
    })
    .catch((err) => {
      console.log(err)
    })
}
function initializeMetaDataFile() {
  // passing those two extra parameters to stringify, makes it write the json PrettyPrinted
  storeToMetaDataFile({ todo_count: 0 })
    .then((result) => {
      console.log("Initialized MetaData File")
    })
    .catch((err) => {
      console.log(err)
    })
}
function init() {
  initializeMetaDataFile()
  initializeDBFile()
}
async function reAssignIds() {
  var i = 0
  const json = await readDBFile()
  json.map((e) => (e.id = ++i))
  await storeToDbFile(json)
}
function prepareData(data) {
  return data.reduce((prev, elem, index, arr) => {
    const [key, value] = elem.split("=")
    prev[key] = value
    return prev
  }, {})
}
module.exports = {
  getNextId,
  getCurrentId,
  readDBFile,
  readMetaDataFile,
  storeToDbFile,
  storeToMetaDataFile,
  initializeDBFile,
  initializeMetaDataFile,
  init,
  reAssignIds,
  prepareData,
}
