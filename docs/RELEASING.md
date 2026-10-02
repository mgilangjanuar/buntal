# Releasing

All npm packages (`@buntal/http`, `buntal`, `@buntal/cli`, `create-buntal`) share one version and are published by CI when a `v*` tag is pushed to a commit on `main`.

## Steps

1. On a branch, bump every package and the internal dependency ranges:

   ```sh
   bun run release:version 1.0.0
   ```

2. Open a PR, get it reviewed and merge it to `main`.
3. Tag the merged commit and push the tag:

   ```sh
   git checkout main && git pull --ff-only
   git tag v1.0.0 && git push origin v1.0.0
   ```

The [Release workflow](../.github/workflows/release.yml) then:

- refuses to run unless the tagged commit is on `main` and every `package.json` version equals the tag;
- type-checks and tests every package;
- publishes in dependency order with `bun publish` (versions already on npm are skipped, so re-running a failed job is safe);
- generates GitHub release notes with changelogithub.

Tags with a pre-release suffix (`v1.1.0-rc.1`) publish under the `next` dist-tag; everything else goes to `latest`.

## One-time setup

- **npm token:** create a granular access token on npmjs.com with read and write access to `buntal`, `create-buntal` and the `@buntal` scope, with "Bypass two-factor authentication" enabled for publishing. Store it as the `NPM_TOKEN` secret of the `npm` environment (Settings > Environments). Add required reviewers to that environment if releases should need an approval.
- Never move or re-push an existing tag. If a release is broken, fix it on `main` and release the next patch version.

## Dry run

```sh
RELEASE_TAG=v1.0.0 bun scripts/release.ts --check     # versions only
RELEASE_TAG=v1.0.0 bun scripts/release.ts --dry-run   # also packs every package
```
