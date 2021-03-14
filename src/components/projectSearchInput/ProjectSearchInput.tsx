import React from 'react';
import { Button, Col, Form, FormControl, InputGroup } from 'react-bootstrap';

type ProjectSearchProps = {
  projectID: string;
  setProjectID: (arg: string) => void;
  handleFetch: () => void;
};

const ProjectSearchInput: React.FC<ProjectSearchProps> = ({
  projectID,
  setProjectID,
  handleFetch,
}: ProjectSearchProps) => {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleFetch();
  };

  return (
    <Col xs="11" md="8">
      <Form onSubmit={handleSubmit} className="d-flex">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Project ID</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="For random leave empty"
            value={projectID!}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProjectID(e.target.value.replace(/[^A-Z0-9-]/gi, ''))
            }
          />
        </InputGroup>
        <Button variant="primary" type="submit" className="ml-2">
          🔍
        </Button>
      </Form>
    </Col>
  );
};

export default ProjectSearchInput;
