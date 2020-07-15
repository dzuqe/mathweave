function replUIFactory(txid,data,store) {
  const element = `
    <script>var json = \`${store}\`;<\/script>
    <a href="https://viewblock.io/arweave/tx/${txid}" target="_blank">${txid}</a> | <a  title="This will add the expressions so you can use them in the CLI" style="cursor: pointer; text-decoration: underline" onClick="saveExpressions('${store}', document.getElementById('update'))">Add to session</a>
    <div id="commandline">
      <div class="cle">
        <div class="top-panel">
          <div class='results'>${data}</div>
        </div>
      </div>
    </div>
  `;

  return element;
}

function clearSession(elem) {
  localStorage.removeItem('default');
  elem.innerHTML += '(Cleared your session)<br/>';
}

function saveExpressions(data, elem) {
  console.log(data);
  var store = data.replace(/\|/g, '\'');
  var json = store.split('#'); 
  console.log(json);
  var prevStore = JSON.parse(localStorage.getItem('default'));
  var _default = (prevStore !== null) ? JSON.stringify(prevStore.concat(json)) : JSON.stringify(json);
  console.log(_default);
  localStorage.setItem('default', _default);
  elem.innerHTML += '(Saved expressions to your session)<br/>';
}

function encodeData(data) {
  var node = document.createElement('div');

  node.innerHTML = data;
  var newStore = [];
  for (var k = 0; k < node.children.length; k++) {
    var child = node.children[k];
    if (child.className === 'expr') {
      newStore.push(child.textContent);
    }

  }
  var join =newStore.join('#');
  join = join.replace(/'/g, '|');

  return join;

}
