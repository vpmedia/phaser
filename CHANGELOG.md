## [1.124.0] - 2026-09-06

### 🐛 Bug Fixes

- *(graphics)* Cull triangles by the sign of the 2D cross product

### 🚜 Refactor

- *(types)* Make the array set generic and type the canvas renderer
- *(types)* Type the tween values, filters and button handlers
- *(types)* Type the webgl managers, buffers and batch roots
- *(types)* Type the frames, factory arguments and canvas pool owners
- *(types)* Type the sprite batch shaders and legacy audio nodes
- *(types)* Type the shader uniforms, masks and line anchors
- *(types)* Describe the atlas and bitmap font descriptors
- *(types)* Retire the last explicit any
- *(types)* Close the last unsafe reads and drop the ActiveX xml path
- *(types)* Annotate every return type and setter parameter

### 🧪 Testing

- *(tween)* Cover the tween value handling and easing lookup

### ⚙️ Miscellaneous Tasks

- Release
- *(release)* V1.124.0
## [1.123.0] - 2026-09-06

### 🐛 Bug Fixes

- *(canvas)* Fall back to the body when the parent id is empty

### ⚙️ Miscellaneous Tasks

- Release
- *(release)* V1.123.0
## [1.122.0] - 2026-09-06

### 🚜 Refactor

- *(types)* Name the pointer callbacks and keep display object data untyped

### ⚙️ Miscellaneous Tasks

- Release
- *(release)* V1.122.0
## [1.121.0] - 2026-09-06

### 🚜 Refactor

- *(types)* Distinguish a polygon's point and flattened forms
- *(types)* Type the display object hooks and scale manager config
- *(lint)* Adopt the modern math, string and DOM APIs
- *(lint)* Drop the inferrable type annotations
- *(naming)* Give the easing and parser functions camelCase names
- *(lint)* Spread, iterate and assign the modern way
- *(lint)* Flatten the nested conditions and index loops
- *(lint)* Destructure and use ternaries where the branches only pick a value
- *(lint)* Drop the this aliases and the deprecated browser reads
- *(lint)* Register DOM handlers with addEventListener and clear the TODO markers
- *(types)* Give the engine callbacks a real signature

### ⚙️ Miscellaneous Tasks

- Release
- *(release)* V1.121.0
## [1.120.0] - 2026-09-06

### 🚀 Features

- *(types)* Export the game config and scene manager types

### ⚙️ Miscellaneous Tasks

- Release
- *(release)* V1.120.0
## [1.119.0] - 2026-09-06

### 🚜 Refactor

- *(types)* Describe the game config and the scene manager states

### ⚙️ Miscellaneous Tasks

- Release
- *(release)* V1.119.0
## [1.118.0] - 2026-09-06

### 🚜 Refactor

- *(types)* Describe the loader payload and pack manifest
- *(types)* Type the bitmap font parsers
- *(types)* Type the sound markers and tween manager
- *(types)* Type the asset cache entries and bitmap text layout

### ⚙️ Miscellaneous Tasks

- Release
- *(release)* V1.118.0
## [1.117.0] - 2026-09-06

### 🚜 Refactor

- *(types)* Annotate inferred return types
- *(types)* Type the texture classes
- *(types)* Type the webgl graphics builders and fast batch
- *(types)* Type the tween data and asset cache
- *(types)* Type the input handler, sound manager and webgl renderer
- *(types)* Type the geometry helpers, tinter and animation manager
- *(types)* Type the scale manager
- *(types)* Type the sound manager, input and pointer

### ⚙️ Miscellaneous Tasks

- Release
- *(release)* V1.117.0
## [1.116.0] - 2026-09-06

### 🐛 Bug Fixes

- *(types)* Let callback APIs take any receiver again

### ⚙️ Miscellaneous Tasks

- Release
- *(release)* V1.116.0
## [1.115.0] - 2026-09-06

### 🐛 Bug Fixes

- *(graphics)* Stop containsPoint looping forever
- *(text)* Read a px font size back as a number again

### 🚜 Refactor

- *(types)* Give the render session a real type
- *(types)* Type the earcut triangulation
- *(types)* Normalise the mask manager signature
- *(types)* Describe the loader's file descriptor
- *(types)* Type the input event pipeline
- *(types)* Name the shared engine surfaces

### ⚙️ Miscellaneous Tasks

- Release
- *(release)* V1.115.0
## [1.114.0] - 2026-09-06

### 🐛 Bug Fixes

- *(text)* Restore the constructor's text coercion

### ⚙️ Miscellaneous Tasks

- Release
- *(release)* V1.114.0
## [1.113.0] - 2026-09-06

### 🚀 Features

- *(types)* Enable strict type checking and type-aware linting

### 📚 Documentation

- Record the lint setup and the staged-rule backlog

### 🧪 Testing

- Cover the modules the strict-types work reshaped

### ⚙️ Miscellaneous Tasks

- Release
- *(release)* V1.113.0
## [1.112.0] - 2026-09-06

### 🚀 Features

- *(log)* Move the engine logger to logtape

### 🐛 Bug Fixes

- *(deps)* Match the logtape specifier the lockfile records

### ⚙️ Miscellaneous Tasks

- Release
- *(release)* V1.112.0
## [1.111.0] - 2026-09-06

### 🐛 Bug Fixes

- *(cache)* Delete sprite sheets and texture atlases from the bucket they live in

### ⚙️ Miscellaneous Tasks

- Release
- *(release)* V1.111.0
## [1.110.0] - 2026-09-06

### 🚀 Features

- *(types)* Replace any on the engine surfaces the game clients consume
- *(types)* Type the factory, group, input handler and text surfaces
- *(types)* Type Device, the pointer data and isTweening

### ⚙️ Miscellaneous Tasks

- Release
- *(release)* V1.110.0
## [1.109.0] - 2026-08-19

### 🐛 Bug Fixes

- *(types)* Type DisplayObject.data as the free-form payload it is

### ⚙️ Miscellaneous Tasks

- Release
- *(release)* V1.109.0
## [1.108.0] - 2026-08-19

### 🐛 Bug Fixes

- *(types)* Keep DisplayObject.data a free-form payload

### ⚙️ Miscellaneous Tasks

- Release
- *(release)* V1.108.0
## [1.107.0] - 2026-08-19

### 🚀 Features

- *(types)* Enable noImplicitAny and resolve the resulting errors
- *(types)* Enable the zero-cost strictness flags
- *(types)* Enable noImplicitOverride, noUnusedLocals and noUnusedParameters
- *(types)* Enable strictNullChecks and resolve the resulting errors
- *(types)* Adopt exactOptionalPropertyTypes

### 💼 Other

- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Migrate to typescript 7
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump oxfmt to 0.59.0 and rolldown to 1.2.0
- *(deps)* Bump the github-actions group with 3 updates
- *(deps)* Update dependencies
- *(deps)* Update non-major dependencies
- *(deps)* Update non-major dependencies
- *(deps)* Update non-major dependencies

### 📚 Documentation

- Trim always-loaded agent context
- Move always-loaded agent docs to on-demand loading

### ⚙️ Miscellaneous Tasks

- Release
- *(vscode)* Enable claude hooks in the workspace settings
- *(release)* V1.107.0
## [1.106.0] - 2026-07-07

### 🚀 Features

- Export cache, input, pointer, loader and loader-file types

### 💼 Other

- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions

### 📚 Documentation

- *(agents)* Add Documentation section with llms.txt links
- *(agents)* Standardize structure and commit-config wording
- *(agents)* Remove non-existent TypeScript llms.txt link
- Refresh AGENTS.md

### ⚙️ Miscellaneous Tasks

- Release
- *(lint)* Switch oxlint categories to error and disable current violations
- Enable blockExoticSubdeps in pnpm workspace
- Migrate from jsdom to happy-dom
- Gitignore .claude/settings.local.json
- Update dependencies
- Pin GitHub Actions to commit SHAs and upgrade to latest
- *(lint)* Disable rules newly enforced by oxlint 1.71
- *(release)* V1.106.0
## [1.105.0] - 2026-05-11

### 🚜 Refactor

- *(types)* Migrate JSDoc to inline TypeScript types

### ⚙️ Miscellaneous Tasks

- Release
- *(release)* V1.105.0
## [1.104.0] - 2026-05-11

### 🐛 Bug Fixes

- *(types)* Emit class fields in declarations

### 💼 Other

- *(deps)* Bump dependency versions

### ⚙️ Miscellaneous Tasks

- Release
- *(release)* V1.104.0
## [1.103.0] - 2026-05-11

### 🐛 Bug Fixes

- Fixed ts6 compat issues

### 💼 Other

- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions

### 🚜 Refactor

- Migrate source to typescript

### 📚 Documentation

- Expand AGENTS.md with overview, tech stack, and project guide

### ⚙️ Miscellaneous Tasks

- Release
- *(ai)* Add shared clean-code rules for Claude
- *(release)* V1.103.0
## [1.102.0] - 2026-04-23

### 💼 Other

- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Update cli scripts
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions

### ⚙️ Miscellaneous Tasks

- Release
- Disabled failing lint error
- Drop eslint, use oxlint only
- Use oxlint only
- Only audit production package
- Migrate from prettier to oxfmt
- *(deps)* Bump slack github action to v3
- *(deps)* Update pnpm/action-setup to v5
- *(security)* Set pnpm minimum release age to 1 day
- *(security)* Pin github actions to immutable releases
- *(ai)* Added CLAUDE.md
- *(security)* Bumped uuid pkg version
- *(release)* V1.102.0
## [1.101.0] - 2026-02-05

### 💼 Other

- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions

### 🧪 Testing

- Optimize vitest performance, use standard config format

### ⚙️ Miscellaneous Tasks

- Release
- Use eslint plugin jsdoc typescript flavor
- Fixed lint errors
- *(release)* V1.101.0
## [1.100.0] - 2026-01-05

### 🐛 Bug Fixes

- Remove audio from decode watchlist if decode fails

### 💼 Other

- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions

### ⚙️ Miscellaneous Tasks

- Release
- *(release)* V1.100.0
## [1.99.0] - 2025-12-29

### 💼 Other

- *(deps)* Bump dependency versions

### ⚙️ Miscellaneous Tasks

- Release
- Regenerated types
- *(release)* V1.99.0
## [1.98.0] - 2025-12-29

### 💼 Other

- *(deps)* Bumped package versions

### ⚙️ Miscellaneous Tasks

- Release
- *(release)* V1.98.0
## [1.97.0] - 2025-12-29

### 🚀 Features

- Added signal async support
- Added async wait to timer

### 💼 Other

- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions

### ⚙️ Miscellaneous Tasks

- Release
- Improve type checking
- *(release)* V1.97.0
## [1.96.0] - 2025-12-17

### 💼 Other

- *(deps)* Bump dependency versions

### 📚 Documentation

- Improve jsdocs
- Improve jsdoc comments
- Improve jsdoc comments
- Improve jsdoc comments
- Improve jsdoc comments
- Improve jsdoc comments
- Improve jsdoc comments
- Improve jsdoc comments
- Regenerated types
- Improve jsdoc comments
- Improve jsdoc comments
- Improved jsdoc comments
- Improve jsdoc comments
- Improve jsdoc comments
- Improve jsdoc comments
- Improve jsdoc comments

### ⚙️ Miscellaneous Tasks

- Release
- *(release)* V1.96.0
## [1.95.0] - 2025-12-16

### 💼 Other

- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions

### ⚙️ Miscellaneous Tasks

- Release
- Improve type checking
- *(release)* V1.95.0
## [1.94.0] - 2025-12-11

### ⚙️ Miscellaneous Tasks

- Release
- Improve type checking
- *(release)* V1.94.0
## [1.93.0] - 2025-12-11

### ⚙️ Miscellaneous Tasks

- Release
- Improve type checking
- *(release)* V1.93.0
## [1.92.0] - 2025-12-11

### ⚙️ Miscellaneous Tasks

- Release
- Improve type checking
- Cleanup
- *(release)* V1.92.0
## [1.91.0] - 2025-12-11

### ⚙️ Miscellaneous Tasks

- Release
- Improve type checking
- *(release)* V1.91.0
## [1.90.0] - 2025-12-11

### 🚜 Refactor

- Improve type checking

### ⚙️ Miscellaneous Tasks

- Release
- *(release)* V1.90.0
## [1.89.0] - 2025-12-11

### ⚙️ Miscellaneous Tasks

- Release
- Improve type checking
- *(release)* V1.89.0
## [1.88.0] - 2025-12-11

### ⚙️ Miscellaneous Tasks

- Release
- Enable type checking
- *(release)* V1.88.0
## [1.87.0] - 2025-12-11

### 💼 Other

- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(security)* Do not run ci.yml on pull requests
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bump dependency versions
- *(deps)* Bumped dependency versions, added type aware lint plugins

### ⚙️ Miscellaneous Tasks

- Release
- Do not auto format md files (breaks changelog generator output)
- Generate complete changelogs
- *(security)* Added pnpm audit build step
- *(security)* Protect agains npm supply chain attacks
- *(lefthook)* Adjusted lefthook rule to do not fail on deleted files
- Improve typechecking
- *(release)* V1.87.0
## [1.86.0] - 2025-11-23

### 💼 Other

- Update dependencies
- Update dependencies
- Update dependencies
- Update dependencies
- Update dependencies
- Update dependencies
- Update dependencies
- Update dependencies
- Update dependencies
- Update dependencies
- Update dependencies
- *(deps)* Bump dependency versions
- *(deps)* Bumped github actions/checkout to v6

### 📚 Documentation

- Added changelog and license files

### ⚙️ Miscellaneous Tasks

- *(lint)* Integrated commitlint
- Integrated git cliff to generater changelogs
- Adjusted publish release commit message format
- *(release)* V1.86.0
## [1.84.0] - 2025-10-12
