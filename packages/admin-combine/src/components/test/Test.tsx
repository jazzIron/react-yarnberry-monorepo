import { Button } from '@common/components';

export function Test() {
  console.log('test item');
  return (
    <div className="test">
      hello
      <Button onClick={() => true} label="TEST" />
    </div>
  );
}
