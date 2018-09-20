import * as R from 'ramda';

const withDefault = R.pathOr('unknown');

export function formatOnedriveFile({ data }) {
  const { id, email, displayName } = data.createdBy.user;
  const task = {
    name: data.name,
    type: withDefault(['file', 'mimeType'], data),
    size: data.size,
    modified: data.lastModified,
    created: data.createdDateTime,
    owner: {
      email,
      _id: id,
      name: displayName,
    },
  };
  return {
    task,
    upload: {
      type: 'ONEDRIVE',
      meta: {
        ...task,
        '@microsoft.graph.downloadUrl': data['@microsoft.graph.downloadUrl'],
        webUrl: data.webUrl,
      },
    },
  };
}

const parseDate = Date.parse.bind(Date);

export function formatLocalFile(file, user) {
  const { _id, email, name } = user;
  // IE 11 does not supply lastModified
  const date = R.pipe(
    R.pathOr(new Date(), ['data', 'lastModified']),
    parseDate
  )(file);

  const task = {
    name: file.name,
    type: withDefault(['extension'], file),
    size: file.size,
    modified: date,
    // Browser does not provide when the file was created
    created: date,
    owner: {
      email,
      _id,
      name,
    },
  };
  return {
    task,
    upload: {
      type: 'FILE',
      meta: task,
    },
  };
}
