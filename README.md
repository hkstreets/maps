# Streets of Hong Kong

Mapping projects by [Diana Pang](https://dianapang.net/)

## Stack

- [hugo](https://github.com/gohugoio/hugo) : static site generator
- [cloudflare](https://dash.cloudflare.com/a6eeace4b6d9f8e07ab307964e74d801/pages/view/hkstreets) : CI & hosting
- [mapbox](https://www.mapbox.com/) : basemap & map interactivity

## Hosting & Deployment

- `main` branch deploys to [maps.dianapang.net](https://maps.dianapang.net/).
- every last pushed commit and branch has its own preview page at `<commit>.hkstreets.pages.dev` or 
`<branch>.hkstreets.pages.dev`.

## Domains

- [maps.dianapang.net](https://maps.dianapang.net)
- [hkstreets.pages.dev](https://hkstreets.pages.dev)

## Hugo 

We use hugo as our static site generator.

### Previewing the site

To run a development server that live reloads

```bash
hugo server --buildDrafts
```

Or if you want to be redirected automatically to the page with the latest change, run

```bash
hugo server --navigateToChanged --buildDrafts
```

### Starting a new mapping project

To start a new project, use hugo to generate the directory structure. In the below, replace `name-of-project` with the project identifier

```bash
hugo new --kind project-bundle projects/name-of-project
```

### Installing theme updates 

As new releases are posted, you can update the theme using Hugo. Simply run 

```bash
hugo mod get -u
```

from your project directory and the theme will automatically update to the latest release.
