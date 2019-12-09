import { useHistory } from 'react-router-dom';
import { updateQuery, getQuery } from '@spotlightdata/ne-helpers';

export function useQueryTab(
  initialTab: string,
  allowed: string[]
): [string, (tab: string) => void] {
  const history = useHistory();
  let tab: string = getQuery(history).tab;
  if (!allowed.includes(tab)) {
    tab = initialTab;
  }

  const setTab = (tab: string) => history.push(updateQuery(history, [['tab', tab]]).location);
  return [tab, setTab];
}
