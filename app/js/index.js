
console.log('qwerqwerqwer', jQuery);

const propLS = 'qwerqwerqwer';

function initPlugin() {
  $('body').addClass('hover-on');
  $('body').on('click','*', afterClick)
}

function afterClick(e) {
  e.preventDefault();
  e.stopPropagation();

  const elSelector = $(e.currentTarget).getPath();
  //console.log(createUniqueSelector(e));
  hideEl(elSelector);

  let settings = getSettings();
  settings.push(elSelector);
  saveSettings(settings);
  deactivatePlugin();
}

function getSettings() {
  return localStorage.getItem(propLS)
    ? JSON.parse(localStorage.getItem(propLS))
    : [];
}

function saveSettings(settings) {
  localStorage.setItem(propLS, JSON.stringify(settings))
}

function deactivatePlugin() {
  $('body').removeClass('hover-on');
  $('body').off('click', '*', afterClick)
}

jQuery.fn.getPath = function () {
  if (this.length != 1) throw 'Requires one element.';

  var path, node = this;
  while (node.length) {
    var realNode = node[0], name = realNode.localName;
    if (!name) break;
    name = name.toLowerCase();
    var parent = node.parent();
    var siblings = parent.children(name);
    if (siblings.length > 1) {
      name += ':eq(' + siblings.index(realNode) + ')';
    }

    path = name + (path ? '>' + path : '');
    node = parent;
  }
  return path;
};

function hideEl(el) {
  $(el).css({display: 'none'})
}
window.onload = function () {

  getSettings().forEach((elSelector) => hideEl(elSelector));

  initPlugin();
};
