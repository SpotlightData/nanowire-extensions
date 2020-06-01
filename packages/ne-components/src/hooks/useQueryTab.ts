import { useHistory } from 'react-router-dom';
import { updateQuery, getQuery } from '@spotlightdata/ne-helpers';

export function useQueryTab(
  initialTab: string,
  allowed: string[],
  tabKey: string = 'tab'
): [string, (tab: string, replace?: boolean) => void] {
  const history = useHistory();
  let tab: string = getQuery(history)[tabKey];
  if (!allowed.includes(tab)) {
    tab = initialTab;
  }

  const setTab = (tab: string, replace: boolean = true) => {
    if (replace) {
      history.push(updateQuery(history, [[tabKey, tab]]).location);
    } else {
      history.replace(updateQuery(history, [[tabKey, tab]]).location);
    }
  };
  return [tab, setTab];
}
