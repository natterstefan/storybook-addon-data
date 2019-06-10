# storybook-addon-data Changelog

All notable changes to this project will be documented here. The format is based
on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project
adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 2019/04/10 1.2.0

### Added

- Markdown support: it is now possible to add markdown content as `notes` to
  both `withData` and `withDataWrapper`
- The [options parameters](https://storybook.js.org/docs/configurations/options-parameter/)
  can also contain a markdown `notes` property

### Deprecated

- `withDataWrapper` becomes `withDataHOC`, as I find the name more meaningful.
  Everything else stays the same, eg. same arguments and results.

## 2019/04/29 1.1.0

### Added

- remove `vendor` files (including prism code) and replace them with
  [`react-syntax-highlighter`](https://www.npmjs.com/package/react-syntax-highlighter)

## 2019/03/25 1.0.1

### Fixed

- fix issue when storyParams are undefined in `withDataWrapper`

## 2019/03/25 1.0.0

### Changed

- added `react` and `@storybook/addons` as `peerDependencies`
- **Breaking**: upgraded storybook@4 to storybook@5 (see [Storybook 5 Migration Guide](https://medium.com/storybookjs/storybook-5-migration-guide-d804b38c739d))

### Removed

- `styled-components` dependency (because the applied styling is way to simple)

## 2019/03/06 0.3.1

### Fixed

- fix build: package did not contain `constants.js`

## 2019/03/06 0.3.0

### Added

- first draft of the `withDataWrapper` (HoC) implemented, as a first alternative
  to the existing decorator

### Changed

- Upgraded packages (non-breaking)

## 2019/02/22 0.2.0

### Changed

- use [react hooks](https://reactjs.org/docs/hooks-overview.html)

## 2019/02/21 0.1.0

### Added

- [PrismJS](https://prismjs.com/) support
- initial setup with a basic addon based on and inspired by
  - [Writing Addons](https://storybook.js.org/addons/writing-addons/)
  - [storybook-addon-code](https://github.com/SOFTVISION-University/storybook-addon-code)
