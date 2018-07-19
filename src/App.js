import React, { Component } from "react";
import Thumbnail from "./components/Thumbnail";
import {
  Jumbotron,
  Container,
  Row, Col,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import urls from "./components/pokemon";
import "./style.css";

class App extends Component {
  state = {
    score: 0,
    topScore: 0,
    allClickedItems: [],
    lost: false,
    initialized: false,
    order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  };

  refreshImage = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    let { score, topScore, allClickedItems, lost } = this.state,
      thisItem = event.target.getAttribute("name");
    if (allClickedItems.includes(thisItem)) {
      if (topScore < score) { topScore = score; }
      score = 0;
      lost = true;
      allClickedItems = [];
    } else {
      score++;
      lost = false;
      allClickedItems.push(thisItem);
      console.log(allClickedItems);
    }
    let newOrder = [];
    for (let i = 11; i >= 0; i--) {
      let element = Math.floor(Math.random() * (i + 1));
      newOrder.push(this.state.order[element]);
      this.state.order.splice(element, 1);
    }
    //console.log(newOrder);

    this.setState({
      order: newOrder,
      allClickedItems: allClickedItems,
      lost: lost,
      score: score,
      initialized: true,
      topScore: topScore
    });
  };

  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <Navbar expand="md">
          <NavbarBrand href="/">Pok&eacute;mon Clicky Game</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem className="main-item">
              {this.state.initialized ? "" : "Click On An Image to Play"}
            </NavItem>
            <NavItem className="main-item">
              {this.state.initialized ? (this.state.lost ? "YOU LOST" : "GOOD CHOICE") : ""}
            </NavItem>
            <NavItem className="right-item">
              Current Score: {this.state.score}
            </NavItem>
            <NavItem className="right-item">
              Top Score: {this.state.topScore}
            </NavItem>
          </Nav>
        </Navbar>
        <Jumbotron>
          <h1 className="main-display">Pok&eacute;mon Clicky Game</h1>
        </Jumbotron >
        <Container>
          <Row>
            <Col xs="3"><Thumbnail src={urls[this.state.order[0]]} refreshImage={this.refreshImage} /></Col>
            <Col xs="3"><Thumbnail src={urls[this.state.order[1]]} refreshImage={this.refreshImage} /></Col>
            <Col xs="3"><Thumbnail src={urls[this.state.order[2]]} refreshImage={this.refreshImage} /></Col>
            <Col xs="3"><Thumbnail src={urls[this.state.order[3]]} refreshImage={this.refreshImage} /></Col>
          </Row>
          <Row>
            <Col xs="3"><Thumbnail src={urls[this.state.order[4]]} refreshImage={this.refreshImage} /></Col>
            <Col xs="3"><Thumbnail src={urls[this.state.order[5]]} refreshImage={this.refreshImage} /></Col>
            <Col xs="3"><Thumbnail src={urls[this.state.order[6]]} refreshImage={this.refreshImage} /></Col>
            <Col xs="3"><Thumbnail src={urls[this.state.order[7]]} refreshImage={this.refreshImage} /></Col>
          </Row>
          <Row>
            <Col xs="3"><Thumbnail src={urls[this.state.order[8]]} refreshImage={this.refreshImage} /></Col>
            <Col xs="3"><Thumbnail src={urls[this.state.order[9]]} refreshImage={this.refreshImage} /></Col>
            <Col xs="3"><Thumbnail src={urls[this.state.order[10]]} refreshImage={this.refreshImage} /></Col>
            <Col xs="3"><Thumbnail src={urls[this.state.order[11]]} refreshImage={this.refreshImage} /></Col>
          </Row>
        </Container>
      </div >
    );
  }
}

export default App;
