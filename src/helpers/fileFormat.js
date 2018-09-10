import { pathOr } from 'ramda';

const withDefault = pathOr('unknown');

export function formatOnedriveFile({ data }) {
  const { id, email, displayName } = data.createdBy.user;
  return {
    task: {
      name: data.name,
      type: withDefault(['file', 'mimeType'], data),
      size: data.size,
      modified: data.lastModified,
      created: data.created,
      owner: {
        email,
        _id: id,
        name: displayName,
      },
    },
    upload: {
      type: 'ONEDRIVE',
      meta: {
        name: data.name,
        '@microsoft.graph.downloadUrl': data['@microsoft.graph.downloadUrl'],
        webUrl: data.webUrl,
      },
    },
  };
}

export function formatLocalFile(file, user) {
  const { _id, email, name } = user;
  return {
    task: {
      name: file.name,
      type: withDefault(['extension'], file),
      size: file.size,
      modified: withDefault(['data', 'lastModified'], file),
      // Browser does not provide when the file was created
      created: withDefault(['data', 'lastModified'], file),
      owner: {
        email,
        _id,
        name,
      },
    },
    upload: {
      type: 'FILE',
      meta: {},
    },
  };
}
