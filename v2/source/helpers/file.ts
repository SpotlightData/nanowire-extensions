import * as R from 'ramda';
import { UserMeta } from '../interfaces';
import { FILE_SIZE_UNITS } from '../constants';

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

export function bytesToReadableBare(units: string[]) {
  return (x: string | number) => {
    let l = 0;
    let n = typeof x === 'string' ? parseInt(x, 10) : x;

    while (n >= 1024) {
      n /= 1024;
      l += 1;
    }
    const rounded = n.toFixed(n >= 10 || l < 1 ? 0 : 1);
    return `${rounded} ${units[l]}`;
  };
}

export const bytesToReadable = bytesToReadableBare(FILE_SIZE_UNITS);
