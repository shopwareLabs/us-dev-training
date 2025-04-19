# us-dev-training

Building a Shopware plugin with best practices.
Takes place in Chicago on April 23, 2025.

## Trainer

- [Tobias Berge](https://github.com/tobiasberge) (Storefront)
- [Malte Janz](https://github.com/MalteJanz) (Admin)
- [Jozsef Damokos](https://github.com/jozsefdamokos) (Core)

## Plugin setup

The plugin is inside a subdirectory. It is recommended to symlink this into your `shopware/custom/plugins` directory.

1. Clone this repository into your "projects" folder, not into `shopware/custom/plugins` directly!
2. Symlink the `SwagFaq` plugin directory into your `shopware/custom/plugins` directory.

```bash
ln -s /Absolute/path/to/us-dev-training/SwagFaq/ shopware/custom/plugins/
```

When done correctly, you should see the "sym-linked" folder inside your IDE.

## Presentation

1. Go into /presentation folder.
2. Open `index.html` in any browser.
