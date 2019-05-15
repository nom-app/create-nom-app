const defaultOptions = {
  projectDirectory: null,
  packageManagerBinary: null
}

class CreateNomApp {
  constructor(projectName, options) {
    // TODO: Do recursive deep-assign
    this.projectName = projectName
    this.options = Object.assign({}, defaultOptions, options)
  }

  create() {
    console.log(`Creating app ${this.projectName}`)
  }
}

export default CreateNomApp
