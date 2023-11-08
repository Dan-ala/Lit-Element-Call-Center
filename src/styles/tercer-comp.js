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

#caja11, #caja22, #caja33 {
    display: flex;
    height: 65px;
    background-color: #023059;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    color: white;
    align-items: center;
  }

  #caja11, #caja22{
    font-size: 35px;
  }

  #caja22{
    margin-left: 50px;
    width: 100px;
  }
  
  #cajas2{
    display: flex;
    width: 200px;
    height: 65px;
    font-size: 15px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color:#3F688C;
    color: white;
    align-items: center;
  }

  #cajas5{
    display: flex;
    width: 150px;
    height: 65px;
    font-size: 15px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color:#3F688C;
    color: white;
    align-items: center;
  }
  #cuadro{
    width: 60rem;
    height: 32rem;
    border-radius: 1rem;
    border-color:black;
  }

  .mt-2{
    background-color: #023059;
  }


  .mt-1{
    background-color: #023059;
    font-size: 25px;
  }


  /* Define styles for the top rectangle */
  .top-rectangle {
    width: 38rem;
    height: 13rem;
    // background-color: #0074D9;
    border: 1px solid #000;
    margin-top: 10px;
  }

  /* Define styles for the bottom rectangle */
  .bottom-rectangle {
    width: 38rem;
    height: 10rem;
    // background-color: #FF4136;
    border: 1px solid #000;
    margin-top: 10px;
  }
  
`