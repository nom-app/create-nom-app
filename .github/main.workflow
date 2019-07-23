workflow "Deploy Docs" {
  on = "push"
  resolves = ["Build and deploy"]
}

// action "On master branch" {
//   uses = "actions/bin/filter@master"
//   args = "branch master"
// }

action "Build and deploy" {
  // needs = ["On master branch"]
  uses = "./actions/deploy-docs/"
}
