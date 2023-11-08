import { css } from "lit-element";

export default css`


.input-groupM{
  position: relative;
  margin-top: 20px;
  width: 300px;
}

.input-groupM input{
  background-color: #95ACBF;
  width: 300px;
  border: none;
  border-radius: 15px;
}

.popup .overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
  display: none;
}

.popup .content{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  background: #fff;
  width:450px;
  height: 500px;
  z-index: 2;
  tex-align: center;
  padding: 20px;
  box-sizing: border-box;
}

.popup .close-btn{
  position: absolute;
  right: 20px;
  top: 20px;
  width: 30px;
  height: 30px;
  background: #222;
  color: #fff;
  font-size: 25px;
  font-weight: 600;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  cursor: pointer;
}

.popup.active .overlay{
  display: block;
}

.popup.active .content{
  transition: all 300ms ease-in-out;
  transform: translate(-50%, -50%) scale(1);
}

.content{
  display: flex;
  flex-direction: column;
  align-content: center;
}

#calling{
  background-color: lightgreen;
}


body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.phone-call {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  padding: 20px;
  max-width: 300px;
}

.caller-info {
  font-size: 20px;
  margin-bottom: 20px;
}

.caller-name {
  font-weight: bold;
}

.call-actions {
  display: flex;
  justify-content: center;
}

.answer-button, .reject-button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.answer-button {
  background-color: #4CAF50;
  color: #fff;
  border: none;
}

.reject-button {
  background-color: #FF5733;
  color: #fff;
  border: none;
}

`
