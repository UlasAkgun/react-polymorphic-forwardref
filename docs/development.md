# Development

## Install Dependencies

Execute the following command to install dependencies:

`npm install`

## Publishing

The version updates are handled with the `@changesets/cli` package. To create a new version, run the following command:

`npx @changesets/cli`

and follow the steps prompted by the tool. This will create a file under the `.changeset` folder. Make sure that the newly generated file is added to Git. Once the PR including that file is merged, it
will automatically create a PR titled as `Version Packages`. Merging this PR will publish the new version to `npm`.