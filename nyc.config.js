const config = {
  watermarks: {
    lines: [95, 100],
    functions: [95, 100],
    branches: [95, 100],
    statements: [95, 100]
  },
  exclude: []
}

// Default `check-coverage` threshold values. Will be overwritten by the lowest
// `watermark` value, if available.
const globalThreshold = {
  lines: 90,
  functions: 90,
  branches: 90,
  statements: 90
}

Object.entries(globalThreshold).forEach(([mark, threshold]) => {
  const watermarksThreshold = config.watermarks[mark]

  if (watermarksThreshold && typeof watermarksThreshold[0] === 'number') {
    [config[mark]] = watermarksThreshold
    return
  }

  config[mark] = threshold
})

module.exports = config
