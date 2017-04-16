# i3-communicator

Package provides i3-ipc interface abstraction with typings.

## Usage example

```typescript
import {I3Communicator, I3Result, i3GetSocketPath} from 'i3-communicator';

const communicator: I3Communicator = new I3Communicator();
const instruction = 'exec xscreensaver-command --lock; exec echo "hello i3"';

communicator.connect(i3GetSocketPath())
    .then(() => {
        communicator.command(instruction)
            .then((results: I3Result[]) => {
                console.log(results);
            });
        }
    );
```

