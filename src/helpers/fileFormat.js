import { pathOr } from 'ramda';

const withDefault = pathOr('unknown');

export function formatOnedriveFile({ data }) {
  return {
    name: data.name,
    source: 'ONEDRIVE',
    id: data.id,
    type: withDefault(['file', 'mimeType'], data),
    size: data.size,
    lastModifiedBy: data.lastModifiedBy.user,
    lastModified: data.lastModifiedDateTime,
    created: data.createdDateTime,
    '@microsoft.graph.downloadUrl': data['@microsoft.graph.downloadUrl'],
    webUrl: data.webUrl,
  };
}

export function formatLocalFile(file, user) {
  const { _id, email, name } = user;
  return {
    name: file.name,
    source: 'FILE',
    id: file.id,
    type: withDefault(['extension'], file),
    size: file.size,
    lastModifiedBy: {
      _id,
      email,
      name,
    },
    lastModified: withDefault(['data', 'lastModified'], file),
    created: withDefault(['data', 'created'], file),
  };
}
