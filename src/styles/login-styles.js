import { css } from "lit-element";

export default css
`

body {
    background: linear-gradient(to left, white, #355B8C, #355B8C);
}

.principal{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 310px;
    width: 370px;
    margin-left: 488px;
    margin-top: 150px;
    border-radius: 25px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    background-color: #95ACBF;
    position: relative;
}


.login-button input{
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 325px;
    margin-left: 512px;
    margin-top: -25px;
}

.login-button input{
    height: 75px;
    border: none;
    border-radius: 25px;
    background-color: #95ACBF;
    font-size: 25px;
    color: white;
}

.btn{
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 325px;
    margin-left: 512px;
    margin-top: -25px;
    height: 75px;
    border: none;
    border-radius: 25px;
    background-color: #95ACBF;
    font-size: 25px;
    color: white;
}


.input-group{
    position: relative;
    margin-top: 2px;
    width: 300px;
}

.input-group input{
    background-color: #355B8C;
    width: 300px;
    border: none;
    border-radius: 15px;
}

::placeholder{
    color: white;
}

.input-group-text{
    border: none;
    background-color: #023059;
    color: white;
}


  

.profile-img{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-buttom: 700px;
    background-color: #023059;
    border-radius: 50%;
    margin-top: -170px;
}

.profile-user{
    width: 170px;
    margin-top: -135%;
} 

.checkbox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    margin-buttom: 25px;
    margin-top: 25px;
}

.msg{
    text-align: center;
    color: black;
    font-size: 20px;
}

`
