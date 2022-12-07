# Streets of Hong Kong

Mapping projects by [Diana Pang](https://dianapang.net/)

## Hugo 

We use hugo as our static site generator.

### Previewing the site

To run a development server that live reloads

```bash
hugo server
```

Or if you want to be redirected automatically to the page with the latest change, run
```bash
hugo server --navigateToChanged
```

### Installing theme updates 

As new releases are posted, you can update the theme using Hugo. Simply run 

```bash
hugo mod get -u
```

from your project directory and the theme will automatically update to the latest release.
