import logo from './logo.png';
import './App.css';

function App() {

  return (
    <div className="App">
      <div className="App-header">
        <div>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-title">.   bRAIDing messages via Wormhole   .</div>
        <img src={logo} className="App-logo" alt="logo" />
        </div>
      </div>
      <div className="App-content">
      <div class="midl"><br />bRAIDing a message means splitting the message into two by using a specified code and a certain formula. Retrieving the original message requires both parts of the message, the splitting code, and the splitting formula. Such a mechanism can add a high level of confidentiality to message transmissions.<br /><br />This webpage allows: Deploying two channels for transmitting two messages between Avalache, Celo, and Base Testnets, using the Wormhole protocol, if the selected wallet has adequate tokens. Splitting of a message into two by using a specified code, and then trasmitting these parts over the deployed channels. Joining two messages using a specified code to retrieve the original message.</div><br /><br />
      <form name="appdeploy" method="post" action="http://localhost:3001/Deploy.php" target="_blank">
          <table>
            <tr>
              <td class="left">Sender Chain</td>
              <td class="rite">
              <input type="radio" id="avalanche" name="sender" value="Avalanche" />
              <label for="avalanche">Avalanche</label>
              <input type="radio" id="celo" name="sender" value="Celo" />
              <label for="celo">Celo</label>
              <input type="radio" id="base" name="sender" value="Base" />
              <label for="base">Base</label>
              </td>
            </tr>
            <tr>
              <td class="left"><input type="hidden" name="deployed" value="true" /></td>
              <td class="rite"><input type="submit" name="deploy" value="Deploy sender and 2 receivers." /></td>
            </tr>
            </table>
            <br /><br />
            </form>
            <form name="sendform" method="post" action="http://localhost:3001/Send.php" target="_blank">
            <table>
            <tr>
              <td class="left">Message to Send</td>
              <td width="800px" ><textarea type="text" id="msgtosend" name="msgtosend" rows="4" cols="50"></textarea></td>
            </tr>
            <tr>
              <td class="left">Code to Split</td>
              <td class="rite"><input type="text" id="codetosplit" name="codetosplit" size="50" /></td>
            </tr>
            <tr>
              <td class="left">Send after Split</td>
              <td class="rite"><input type="checkbox" id="checksend" name="checksend" /></td>
            </tr>
            <tr>
              <td class="left"><input type="hidden" name="sent" value="true" /></td>
              <td class="rite"><input type="submit" name="send" value="Split (and then send if checked)." /></td>
            </tr>
            </table>
            <br /><br />
            </form>
            <form name="sendform" method="post" action="http://localhost:3001/Join.php" target="_blank">
            <table>
            <tr>
              <td class="left">Message Part 1</td>
              <td class="rite"><textarea type="text" id="msgpart1" name="msgpart1" rows="2" cols="50"></textarea></td>
            </tr>
            <tr>
              <td class="left">Message Part 2</td>
              <td class="rite"><textarea type="text" id="msgpart2" name="msgpart2" rows="2" cols="50"></textarea></td>
            </tr>
            <tr>
              <td class="left">Code to Join</td>
              <td class="rite"><input type="text" id="codetojoin" name="codetojoin" size="50" /></td>
            </tr>
            <tr>
              <td class="left"><input type="hidden" name="joined" value="true" /></td>
              <td class="rite"><input type="submit" name="join" value="Join to get original message." /></td>
            </tr>
          </table>
          </form>
          <br /><br />
      </div>
      <div className="App-footer">
        <a className="App-link" href="https://github.com/Lapyl/braid" target="_blank" rel="noopener noreferrer">YouTube-video</a> . | . 
        <a className="App-link" href="https://github.com/Lapyl/braid" target="_blank" rel="noopener noreferrer">Project-info</a> . | . 
        <a className="App-link" href="https://github.com/Lapyl/braid" target="_blank" rel="noopener noreferrer">GitHub-repo</a> . | . 
        <a className="App-link" href="https://github.com/Lapyl/braid" target="_blank" rel="noopener noreferrer">About-us</a> . | . 
        <a className="App-link" href="https://github.com/Lapyl/braid" target="_blank" rel="noopener noreferrer">Sigma-sprint</a> . | . 
        <a className="App-link" href="https://github.com/Lapyl/braid" target="_blank" rel="noopener noreferrer">Wormhole</a>                                
      </div>
  </div>
  )
}

export default App;
