import dropbox from "../../dropbox.app.mjs";
import get from "lodash/get.js";

export default {
  name: "List All Files/Subfolders in a Folder",
  description: "Searches for files and folders by name [See the docs here](https://dropbox.github.io/dropbox-sdk-js/Dropbox.html#filesSearchV2__anchor)",
  key: "dropbox-list-file-folders-in-a-folder",
  version: "0.0.1",
  type: "action",
  props: {
    dropbox,
    query: {
      propDefinition: [
        dropbox,
        "query",
      ],
    },
    path: {
      propDefinition: [
        dropbox,
        "pathFolder",
      ],
      description: "Scopes the search to a path in the user's Dropbox. (Please use a valid path to filter the values)",
    },
    recursive: {
      type: "boolean",
      label: "Recursive",
      description: "If `true`, the list folder operation will be applied recursively to all subfolders and the response will contain contents of all subfolders.",
      default: true,
    },
    includeDeleted: {
      type: "boolean",
      label: "Include Deleted",
      description: "If true, the results will include entries for files and folders that used to exist but were deleted.",
      default: false,
    },
    includeHasExplicitSharedMembers: {
      type: "boolean",
      label: "Include Has Explicit Shared Members",
      description: "If `true`, the results will include a flag for each file indicating whether or not that file has any explicit members.",
      default: false,
    },
    includeMountedFolders: {
      type: "boolean",
      label: "Include Mounted Folders",
      description: "If true, the results will include entries under mounted folders which includes app folder, shared folder and team folder.",
      default: false,
    },
    includeNonDownloadableFiles: {
      type: "boolean",
      label: "Include Non Downloadable Files",
      description: "If `true`, include files that are not downloadable, i.e. Google Docs.",
      default: true,
    },
    limit: {
      propDefinition: [
        dropbox,
        "limit",
      ],
    },
  },
  async run({ $ }) {
    const {
      limit,
      path,
      recursive,
      includeDeleted,
      includeHasExplicitSharedMembers,
      includeMountedFolders,
      includeNonDownloadableFiles,
    } = this;
    const res = await this.dropbox.listFilesFolders({
      path: get(path, "value", path),
      recursive,
      include_deleted: includeDeleted,
      include_has_explicit_shared_members: includeHasExplicitSharedMembers,
      include_mounted_folders: includeMountedFolders,
      include_non_downloadable_files: includeNonDownloadableFiles,
    }, limit);
    $.export("$summary", "Files and folders successfully fetched");
    return res;
  },
};
