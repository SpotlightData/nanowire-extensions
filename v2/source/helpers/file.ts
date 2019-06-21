import * as R from 'ramda';
import { UserMeta } from '../interfaces';

const orUnknown = R.pathOr('unknown');

export function formatOnedriveFileMeta(_user: UserMeta, { data }) {
  let { id, email, displayName } = data.createdBy.user;
  /** Sometimes OneDrive might not give email, we should send empty value in that case*/
  email = email || '';
  const task = {
    name: data.name,
    type: orUnknown(['file', 'mimeType'], data),
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

export function formatLocalFileMeta(user: UserMeta, file) {
  const { _id, email, name } = user;
  // IE 11 does not supply lastModified
  const date = R.pipe(
    R.pathOr(new Date(), ['data', 'lastModified']),
    Date.parse.bind(Date)
  )(file);

  const task = {
    name: file.name,
    type: orUnknown(['extension'], file),
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
