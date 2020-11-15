import React from "react";

import { Container,Row,Col,ToggleButtonGroup,ToggleButton } from 'react-bootstrap';


function ToggleButtonGroupControlled() {


  /*
   * The second argument that will be passed to
   * `handleChange` from `ToggleButtonGroup`
   * is the SyntheticEvent object, but we are
   * not using it in this example so we will omit it.
   */

  return (
<Row>
    <ToggleButtonGroup type="checkbox">
      <ToggleButton value={1}>Option 1</ToggleButton>
      <ToggleButton value={2}>Option 2</ToggleButton>
      <ToggleButton value={3}>Option 3</ToggleButton>
    </ToggleButtonGroup>
</Row>
  );
}

export default ToggleButtonGroupControlled;
