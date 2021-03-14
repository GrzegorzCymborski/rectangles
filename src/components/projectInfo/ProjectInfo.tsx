import { Card, Col, ListGroup } from 'react-bootstrap';
import { InitialStateProps } from '../../redux/project';

const ProjectInfo: React.FC<InitialStateProps> = ({ fetchedData }: InitialStateProps) => {
  return (
    <Col xs="11" md="8">
      <Card className="my-3">
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Project name:</strong> {fetchedData?.name}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Project ID:</strong> {fetchedData?.id}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Items in project:</strong> {fetchedData?.items.length}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
};

export default ProjectInfo;
