import * as React from 'react';
import { Button, Segment, Header, List } from 'semantic-ui-react';

export default class Help extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Header as="h2" attached="top">Keyboard Shortcuts</Header>
        <Segment attached>
          <List>
            <List.Item>
              <Button size="mini">
                N
              </Button>
              Next Speaker
            </List.Item>
            <List.Item>
              <Button size="mini">
                S
              </Button>
              Toggle Speaker Timer
            </List.Item>
            <List.Item>
              <Button size="mini">
                C
              </Button>
              Toggle Caucus Timer
            </List.Item>
          </List>
        </Segment>
      </div>
    );
  }
}