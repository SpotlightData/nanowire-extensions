import * as React from 'react';
import { Row, Input, Button } from 'antd';

interface IgnoreListProps {
  ignore: string[];
  onUpdate(ignore: string[]): void;
}

export const IgnoreList: React.FC<IgnoreListProps> = ({ ignore, onUpdate }) => {
  const [localIgnore, setLocalIgnore] = React.useState<string>(ignore.join(','));

  const update = (entries: string[]) => {
    const clean = entries.map(n => n.trim()).filter(n => n.length > 1);
    onUpdate(clean);
  };

  return (
    <React.Fragment>
      <Row style={{ marginBottom: '1em' }}>
        <Input.TextArea
          value={localIgnore}
          onChange={e => setLocalIgnore(e.target.value)}
          placeholder="List words to ignore, separated by a comma"
          rows={10}
        />
      </Row>
      <Row>
        <Button type="primary" onClick={() => update(localIgnore.split(','))}>
          Update ignores
        </Button>
      </Row>
    </React.Fragment>
  );
};
