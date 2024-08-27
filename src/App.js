import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { FaFilePdf, FaFileWord } from "react-icons/fa";

export default function App() {
  const [showCards, setShowCards] = useState(false);
  const [cvFiles, setCvFiles] = useState([]);
  const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
  const [viewAllCards, setViewAllCards] = useState(false);

  const handleCvFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setCvFiles(prevFiles => [...prevFiles, ...uploadedFiles]);
  };

  const handleJobDescriptionUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setJobDescriptionFile(uploadedFile);
  };

  const handleRankCV = () => {
    setShowCards(true);
  };

  const handleViewAllCards = () => {
    setViewAllCards(true);
  };

  const handleDownloadCv = () => {
    // Dummy function for downloading CVs
  };

  const handleBackToMain = () => {
    setViewAllCards(false);
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    if (extension === 'pdf') {
      return <FaFilePdf color="red" className="me-2" />;
    } else if (extension === 'doc' || extension === 'docx') {
      return <FaFileWord color="blue" className="me-2" />;
    }
    return null;
  };

  const renderCards = (numCards) => {
    return [...Array(numCards)].map((_, index) => (
      <Card className="mb-3" key={index}>
        <Card.Body>
          <Card.Text><strong>Name:</strong> Nathaniel</Card.Text>
          <Card.Text><strong>Experience:</strong> 5 years</Card.Text>
          <Card.Text><strong>Email:</strong> nat@gmail.com</Card.Text>
          <Card.Text><strong>Address:</strong> 7 street street</Card.Text>
          <Card.Text><strong>Phone:</strong> +23456789010</Card.Text>
          <Card.Text><strong>Rank Score:</strong> 85/100</Card.Text>
          <Card.Text><strong>Skills:</strong> React, Node.js, JavaScript</Card.Text>
          <Card.Text><strong>CV Summary:</strong> At vero eos et accusamus et iusto odio dignissimos
            ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et
            quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
            qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem
            rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est
            eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus</Card.Text>
          <Button
            variant="info"
            className="mt-3"
            block
            onClick={handleDownloadCv}
          >
            Download CV
          </Button>
        </Card.Body>
      </Card>
    ));
  };

  return (
    <div className="full-page-wrapper">
      <Container className="h-100 d-flex align-items-center justify-content-center">
        {viewAllCards ? (
          <div className="view-all-cards">
            <Button
              variant="secondary"
              onClick={handleBackToMain}
              className="mb-4"
            >
              Back to Main
            </Button>
            <div className="scrollable-cards">
              {renderCards(3)}
            </div>
          </div>
        ) : (
          <Card className={`w-100 p-4 ${showCards ? 'expanded-card' : 'collapsed-card'}`}>
            <Row>
              {/* Left Panel - Upload Section */}
              <Col lg={showCards ? 7 : 12} className="d-flex flex-column justify-content-center">
                <h5 className="mb-4 text-center">Upload CV Files and Job Description</h5>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Label>Upload CV Files</Form.Label>
                  <Form.Control type="file" multiple onChange={handleCvFileUpload} />
                  <div className="mt-2">
                    {cvFiles.map((file, index) => (
                      <div key={index} className="d-flex align-items-center">
                        {getFileIcon(file.name)}
                        <span>{file.name}</span>
                      </div>
                    ))}
                  </div>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-4">
                  <Form.Label>Upload Job Description</Form.Label>
                  <Form.Control type="file" onChange={handleJobDescriptionUpload} />
                  <div className="mt-2">
                    {jobDescriptionFile && (
                      <div className="d-flex align-items-center">
                        {getFileIcon(jobDescriptionFile.name)}
                        <span>{jobDescriptionFile.name}</span>
                      </div>
                    )}
                  </div>
                </Form.Group>
                <Button
                  className="custom-rank-button"
                  block
                  onClick={handleRankCV}
                >
                  Rank CV
                </Button>

                {showCards && (
                  <Button
                    variant="info"
                    className="mt-3"
                    block
                    onClick={handleViewAllCards}
                  >
                    View All CVs
                  </Button>
                )}
              </Col>

              {/* Right Panel - Display Cards */}
              {showCards && (
                <Col lg={5}>
                  <h5 className="mb-4 md:mt-0 mt-4 text-center">Ranked CVs</h5>
                  <div className="scrollable-cards">
                    {renderCards(3)}
                  </div>
                </Col>
              )}
            </Row>
          </Card>
        )}
      </Container>
    </div>
  );
}
