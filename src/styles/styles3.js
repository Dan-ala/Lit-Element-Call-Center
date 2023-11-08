import { css } from "lit-element";

export default css`

.nav-item{
    margin: 7px;
}

.nav{
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}

.nav-link{
    display: flex;
    border: none;
}

  #caja11, #caja22, #caja33, #caja44 {
    display: flex;
    height: 70px;
    font-size: 40px;
    font-weight: bold;
    background-color: #023059;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    color: white;
    width: 127px;
  }
  #cajasi2 {
    display: flex;
    height: 70px;
    font-size: 30px;
    font-weight: bold;
    background-color: #646262;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    color: white; 
  }

  #cuadro {
    display: flex;
    width: 60rem;
    height: 32rem;
    border-radius: 1rem;
    border-color: black;
  }

  #caja1, #caja2, #caja3, #caja4{
    display: flex;
    width: 170px;
    height: 70px;
    font-size: 15px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: #3F688C;
    color: white; 
    margin-right: -65px;
  }

  .row{
    margin-left: 5px;
  }

  .mt-1{
    background-color: #023059;
  }

  .mt-2{
    background-color: #023059;
  }

  .input-group{
    border: none;
  }

  #numeros{
    width: 50px;
  }
`;
