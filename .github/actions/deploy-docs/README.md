# Deploy Docs

> Build and deploy a Docusaurus project to GitHub Pages.

## Usage

<img src="https://user-images.githubusercontent.com/10104630/61741640-3335f180-ad46-11e9-9e6b-04318829a80f.png" align="right" width=250/>

```bash
action "Build and deploy" {
  uses = "./.github/actions/deploy-docs"
  secrets = ["DOCS_DEPLOY_TOKEN"]
  env = {
    WEBSITE_DIR = "docs/website"
  }
}
```

## Secrets

| **Secret** | **Description** |
|------------|-----------------|
| `DOCS_DEPLOY_TOKEN` | This token must have full access to the repository. View [this section](#creating-your-personal-access-token) on creating your PAT. |

<img src="https://user-images.githubusercontent.com/10104630/61743118-704fb300-ad49-11e9-8a3c-73ef7dc4ffbb.png" align="right" />

### Creating Your Personal Access Token

The personal access token (PAT) must have full access to the repository.

Create your [PAT
here](https://github.com/settings/tokens/new?description=Deploy%20Docs%20for%20...&scopes=repo)
and then click "Generate Token".

<br />
<br />
<br />
<br />

## Environment

| **Name** | **Description** |
|------------|-----------------|
| `WEBSITE_DIR` | The `WEBSITE_DIR` points to the directory, relative to your repository root, containing the `siteConfig.js` file from Docusaurus. See the Docusaurus section on [directory structure](https://docusaurus.io/docs/en/site-preparation#directory-structure) for more information. |

## Arguments

None

## Limitations for Organizations

Organizations that deploy this action on public repositories must use a PAT for `DOCS_DEPLOY_TOKEN`. See this
[page](https://github.com/crazy-max/ghaction-github-pages/tree/v0.5.0#warning-limitation)
for more info.

## License

The [MIT](LICENSE) license
