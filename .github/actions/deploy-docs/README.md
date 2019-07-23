# Deploy Docs

> Build and deploy a Docusaurus project to GitHub Pages.

## Usage

```bash
action "Build and deploy" {
  uses = "./.github/actions/deploy-docs"
  secrets = ["DOCS_DEPLOY_TOKEN"]
  env = {
    WEBSITE_DIR = "docs/website"
  }
}
```

## Environment

| **Name** | **Description** |
|------------|-----------------|
| `WEBSITE_DIR` | The `WEBSITE_DIR` points to the directory, relative to your repository root, containing the `siteConfig.js` file from Docusaurus. See the Docusaurus section on [directory structure](https://docusaurus.io/docs/en/site-preparation#directory-structure) for more information. |

