import styled from "styled-components";
import RoutesComp from "./components/Routes";
import { NavLink } from 'react-router-dom';

function App() {

    return (
        <Wrapper>
            <Header>
                <NavLink to='/'>All Tickers</NavLink>
                <NavLink to='/watching'>Watching Group</NavLink>
            </Header>
            <RoutesComp/>
         </Wrapper>
    );
}

const Header = styled.div`
  position: absolute;
  left: 0;
  top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;

  a {
    text-decoration: none;
    color: black;
    padding: 10px;
    border-radius: 5px;
    transition: all ease 0.3s;
  }

  a:hover {
    background-color: #f0f0f0;
  }
  a.active {
    background-color: #e1edfc;
  }

  a + a {
    margin-left: 50px;
  }
`;

const Wrapper = styled.div`
  padding: 100px 20px;
  display: flex;
  justify-content: center;
`;

export default App;
