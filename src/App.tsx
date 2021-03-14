import React, { useState, useEffect } from 'react';
import { Card, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import MainModal from './components/modal/Modal';
import ProjectInfo from './components/projectInfo/ProjectInfo';
import ProjectSearchInput from './components/projectSearchInput/ProjectSearchInput';
import RenderedFigures from './components/renderedFigures/RenderedFigures';
import { useAppSelector, useAppDispatch } from './redux/hooks/reduxHooks';
import { getData } from './redux/project';
import { dataSchema } from './utils/yupSchema';

const App: React.FC = () => {
  const API = process.env.REACT_APP_API_URL;

  const dispatch = useAppDispatch();
  const { projectData } = useAppSelector((state) => state);
  const [projectID, setProjectID] = useState<string>('');
  const [isError, setIsError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const typeOfError = (code: number) => {
    if (code >= 300 && code <= 399) {
      return '🚧 Redirect error';
    }
    if (code >= 400 && code <= 499) {
      return '🙉 Client error';
    }
    if (code >= 500 && code <= 599) {
      return '📡 Server error';
    }
  };

  const handleError = (response: Response) => {
    setIsError(`${typeOfError(response.status)}: ${response.status} `);
    setIsLoading(false);
  };

  const validateResponse = async (projData: Response) => {
    const projectDataResponse = await projData.json();
    dataSchema.isValid(projectDataResponse).then((val) => {
      val ? dispatch(getData(projectDataResponse.project)) : setIsError('Wrong data 💥');
    });
    setIsLoading(false);
  };

  const handleIf = (projData: Response, initFetch: Response) => {
    if (projData.status !== 200) {
      handleError(initFetch);
    } else {
      validateResponse(projData);
    }
  };

  const handleFetch = async () => {
    setIsLoading(true);
    if (projectID) {
      const projectData2 = await fetch(`${API}/project/${projectID}`);
      handleIf(projectData2, projectData2);
    } else {
      const initialFetch = await fetch(`${API}/init`);
      if (initialFetch.status !== 200) {
        handleError(initialFetch);
      } else {
        const initialFetchJSON = await initialFetch.json();
        const projectData2 = await fetch(`${API}/project/${initialFetchJSON.id}`);
        handleIf(projectData2, initialFetch);
      }
    }
  };

  useEffect(() => {
    console.log(
      '%c🟥🟩🟦Rectangles',
      'background-color: yellow ; color: black ; font-weight: bold ; ' +
        'font-size: 50px ; font-style: italic ; text-decoration: underline ; ' +
        "font-family: 'american typewriter' ; text-shadow: 1px 1px 3px black ;",
    );
  }, []);

  return (
    <Container className="d-flex flex-column" fluid style={{ height: '100vh' }}>
      <Card className="my-3" style={{ height: '100% ' }}>
        <Card.Header>🟥🟩🟦</Card.Header>
        <Row className="d-flex flex-column align-items-center my-3">
          <ProjectSearchInput
            projectID={projectID!}
            setProjectID={setProjectID}
            handleFetch={handleFetch}
          />

          {isLoading && (
            <Col xs="8">
              <ProgressBar className="my-3" animated now={100} />
            </Col>
          )}
          {projectData.fetchedData && <ProjectInfo fetchedData={projectData.fetchedData} />}
        </Row>

        {projectData.fetchedData && <RenderedFigures fetchedData={projectData.fetchedData} />}
      </Card>
      <MainModal isOpen={!!isError} setIsError={setIsError} errorMsg={isError} />
    </Container>
  );
};

export default App;
